'use strict'
const models = require('../models/index')
const Location = models.locations
const StateLicenseInfo = models.state_license_info
const User = models.users
const State = models.states
const errorHandler = require('../../exceptions/error')
const constant = require('../../config/strings/constant')
const sequelize = require('../../db/connection');


const {
    Op
} = require("sequelize");
const helper = require('../util/helper')
const constants = require('../../config/strings/constant')
const {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    INSERT,
    UPDATE,
    NOT_MODIFIED,
    DELETE
} = constants.HTTP_STATUS
exports.locations = async function (req, res) {
    try {
        let perPage = 10;
        let skip = 0;
        let page = parseInt(req.query.page);

        if (page > 1) {
            skip = parseInt(perPage * (page - 1));
        }
        var location = await Location.findAndCountAll({
            where:{
                isDeleted:0
            },
            include:{model:User},
            // attributes: constant.LOCATION_ATTRIBUTES,
            limit: perPage,
            offset: skip
        });

        if (location.rows.length > 0) {
            res.status(OK).json({
                success: true,
                data: location.rows,
                count:location.count,
                message: 'Locations found.'
            });
        } else {

            res.status(OK).json({
                success: false,
                data: [],
                count:0,
                message: 'Locations not found.'
            });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }

}

exports.locationDetail = async function (req, res) {
    try {
        let params = req.query;
        var check = await Location.findOne({
            where: {
                id: params.id,
                isDeleted:0
            },
            include: [{
                model: User
            },
            {
                model: StateLicenseInfo,
                required:false,
                where: {
                    isDeleted: 0
                },
                include: State
            }
        ]
        });

        if (check === null) {
            res.status(NOT_FOUND).json({
                success: false,
                data: null,
                message: 'Location not found.'
            });
        } else {
            res.status(OK).json({
                success: true,
                data: check.dataValues,
                message: 'Location detail found.'
            });
        }
    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

exports.addLocation = async function (req, res) {
    const t = await sequelize.transaction();
    try {
        let body = req.body;
        let newWebImage = {}

     
        var webImage = {
            name: '',
            locationImage: body.websitePhoto
        }
        delete body.websitePhoto
        var check = await Location.create(body,{
            transaction: t
        });

      
        if(body && body.stateLicenseInfo.length>0){
            body.stateLicenseInfo = body.stateLicenseInfo.map(v => ({
                ...v,
                locationId: check.id
            }))
            const stateLicenseInfoData = await StateLicenseInfo.bulkCreate(body.stateLicenseInfo, {
                transaction: t
            });
        }


        if (webImage && webImage.locationImage) {
            webImage.id = check.id
            let fileName = await helper.saveFile(webImage)
            newWebImage = JSON.stringify(fileName)
        }

        if (check) {
            await t.commit();
            await Location.update({
                websitePhoto: newWebImage

            }, {
                where: {
                    id: check.id
                }
            });

            res.status(INSERT).json({
                success: true,
                data: body,
                message: 'Location added successfully.'
            });
        } else {
            res.status(INSERT).json({
                success: false,
                data: [],
                message: 'Oops! Failed to add location.'
            });
        }
    } catch (error) {
        console.log('error',error)
        if (t) {
            await t.rollback();
        }
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }

}

exports.updateLocation = async function (req, res) {
    const t = await sequelize.transaction();
    try {
        let body = req.body;
        let where = {id: body.id,isDeleted:0}
        let webImage={}
        var base64regex = (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(body.websitePhoto)

        if (body && body.websitePhoto && !base64regex) {
            webImage = {id: body.id,name: '',locationImage: body.websitePhoto}
            let fileName = await helper.saveFile(webImage)
            body.websitePhoto = JSON.stringify(fileName)

        }else{
            delete body.websitePhoto
        }
        let deleted =await StateLicenseInfo.destroy({where:{locationId:body.id}},{
            transaction: t
        })
        var check = await Location.update(body, {where: where},{transaction: t});
        console.log('check',check)

      
        if(body && body.stateLicenseInfo && body.stateLicenseInfo.length>0){
            body.stateLicenseInfo = body.stateLicenseInfo.map((el) => {
                el.locationId=body.id
                return el
            })

            console.log('body.stateLicenseInfo',body.stateLicenseInfo)
            var stateLicenseInfoResult=await StateLicenseInfo.bulkCreate(body.stateLicenseInfo, {
                transaction: t
            });

            console.log('stateLicenseInfoResult',stateLicenseInfoResult)

        }

        if (check[0] || stateLicenseInfoResult.length>0) {
            await t.commit();
            res.status(UPDATE).json({
                success: true,
                data: body,
                message: 'Location updated successfully.'
            });
        } else {
            if (t) {
                await t.rollback();
            }
            res.status(NOT_MODIFIED).json({
                success: false,
                data: [],
                message: 'Oops! Failed to update location.'
            });
        }
    } catch (error) {
        console.log('error',error)
        if (t) {
            await t.rollback();
        }
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }

}

exports.delete = async function (req, res) {
    const t = await sequelize.transaction();
    try {
        let params = req.query;

        let deleted = {
            isDeleted: 1
        }
        var check = await Location.findAll({
            where: {
                id: params.id
            },
        });
    
        if ((check.length > 0)) {
          let del= await Location.update({isDeleted:1}, {where: {id: params.id}},{
            transaction: t
        });

        let sResult = await StateLicenseInfo.update(deleted, {
            where: {
                locationId: params.id
            }
        }, {
            transaction: t
        });
        if (del[0] ) {
            await t.commit();
            res.status(OK).json({
                success: true,
                message: 'Location deleted successfully.'
            });
        }else{
            res.status(NOT_FOUND).json({
                success: true,
                message: 'Location not found.'
            }); 
        }
    
        } else {
            res.status(NOT_FOUND).json({
                success: true,
                message: 'Location not found.'
            });
        }
    } catch (error) {
        console.log('error: ', error);
        if (t) {
            await t.rollback();
        }
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
  
}