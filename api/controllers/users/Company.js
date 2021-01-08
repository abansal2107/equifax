'use strict'
const models = require('../../models/index')
const sequelize = require('../../../db/connection');
const Company = models.companies
const StateLicenseInfo = models.state_license_info
const User = models.users
const Location = models.locations
const State = models.states


const {
    Op
} = require("sequelize");
//Error Handling
const helper = require('../../util/helper')
const errorHandler = require('../../../exceptions/error')
const constants = require('../../../config/strings/constant')
const {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    INSERT,
    UPDATE,
    NOT_MODIFIED,
    DELETE
} = constants.HTTP_STATUS

exports.companies = async function (req, res, next) {

    try {
        let perPage = 10;
        let skip = 0;
        let page = parseInt(req.query.page);
        let search = '%%';

        if (req.query.search) {
            search = '%' + req.query.search + '%';
        }

        if (page > 1) {
            skip = parseInt(perPage * (page - 1));
        }

        var companies = await Company.findAndCountAll({
            where: {
                name: {
                    [Op.like]: search
                },
                isDeleted: 0
            },
            limit: perPage,
            offset: skip
        });

        if (companies.rows.length > 0) {

            res.status(OK).json({
                success: true,
                data: companies.rows,
                count: companies.count,
                message: 'Companies found.'
            });

        } else {
            res.status(OK).json({
                success: false,
                data: [],
                count: 0,
                message: 'Companies not found.'
            });
        }

        // next()

    } catch (error) {
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}

exports.addCompany = async function (req, res, next) {
    const t = await sequelize.transaction();
    try {
        let body = req.body;
        var checkEmail = await Company.findOne({
            where: {
                email: body.email
            },
        });
        if (checkEmail) {
            res.status(412).json({
                success: false,
                message: 'Email address already in use.'
            });
        } else {
            let proImage = {}
            let actionImage = {}

            var pImage = {
                name: '',
                image: body.professionalImage
            }
            delete body.professionalImage

            var aImage = {
                name: '',
                image: body.actionPhoto
            }
            delete body.actionPhoto

            body.isDeleted = 0
            const check = await Company.create(body, {
                transaction: t
            });
            body.stateLicenseInfo = body.stateLicenseInfo.map(v => ({
                ...v,
                companyId: check.id
            }))

            const stateLicenseInfoData = await StateLicenseInfo.bulkCreate(body.stateLicenseInfo, {
                transaction: t
            });

            if (pImage && pImage.image) {
                pImage.id = check.id
                let fileName = await helper.saveFile(pImage)
                proImage = JSON.stringify(fileName)
            }

            if (aImage && aImage.image) {
                aImage.id = check.id
                let fileName = await helper.saveFile(aImage)
                actionImage = JSON.stringify(fileName)
            }



            if (check && stateLicenseInfoData) {
                await t.commit();

                const companyResult = await Company.update({
                    professionalImage: proImage,
                    actionPhoto: actionImage

                }, {
                    where: {
                        id: check.id
                    }
                });
                res.status(INSERT).json({
                    success: true,
                    data: body,
                    message: 'Company added successfully.'
                });
            } else {
                res.status(INSERT).json({
                    success: false,
                    data: [],
                    message: 'OOPs Company not added.'
                });
            }

        }
    } catch (error) {
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

exports.updateCompany = async function (req, res) {
    const t = await sequelize.transaction();
    try {
        let body = req.body

        let where = {
            id: body.id,
            isDeleted: 0
        }

        let userData = {}

        var base64regex1 = (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(body.professionalImage)
        var base64regex2 = (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(body.actionPhoto)


        if (body && body.professionalImage && !base64regex1) {
            userData = {
                id: body.id,
                name: '',
                image: body.professionalImage
            }
            let fileName = await helper.saveFile(userData)
            body.professionalImage = JSON.stringify(fileName)

        }else{
            delete body.professionalImage
        }

        if (body && body.actionPhoto && !base64regex2) {
            userData = {
                id: body.id,
                name: '',
                image: body.actionPhoto
            }
            let fileName = await helper.saveFile(userData)
            body.actionPhoto = JSON.stringify(fileName)
        }else{
            delete body.actionPhoto
        }

        const companyResult = await Company.update(body, {where: where}, {transaction: t
        });

        let deleted =await StateLicenseInfo.destroy({where:{companyId:body.id}})
        console.log('deleted',deleted)
        if(body && body.stateLicenseInfo && body.stateLicenseInfo.length>0){
            body.stateLicenseInfo = body.stateLicenseInfo.map((el) => {
                el.companyId=body.id
                return el
            })

            console.log(' body.stateLicenseInfo ', body.stateLicenseInfo )
            const stateLicenseInfoResult=await StateLicenseInfo.bulkCreate(body.stateLicenseInfo, {
                transaction: t
            });
            console.log(' stateLicenseInfoResult ', stateLicenseInfoResult )

        }

        if (companyResult[0]) {
            await t.commit();
            res.status(UPDATE).json({
                success: true,
                data: body,
                message: 'Company updated successfully.'
            });
        } else {
            res.status(NOT_MODIFIED).json({
                success: false,
                data: [],
                message: 'Oops! Failed to update Company.'
            });
        }
    } catch (error) {
        if (t) {
            await t.rollback();
        }
        console.log(error)
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}


exports.companyDetail = async function (req, res) {

    try {
        let body = req.query;

        var check = await Company.findOne({
            where: {
                id: body.id,
                isDeleted: 0
            },
            include: [{
                required:false,    
                model: User

                },
                { required:false,
                    model: Location,
                    where: {
                        isDeleted: 0
                    }
                },
                { required:false,
                    model: StateLicenseInfo,
                   
                    where: {
                        isDeleted: 0
                    },
                    include: State
                }
            ]
        });

        if (check && check.dataValues && check.dataValues.professionalImage) {
            check.dataValues.professionalImage = JSON.parse(check.dataValues.professionalImage)
        }


        if (check && check.dataValues && check.dataValues.actionPhoto) {
            check.dataValues.actionPhoto = JSON.parse(check.dataValues.actionPhoto)
        }

        if (check === null) {
            res.status(OK).json({
                success: false,
                data: null,
                message: 'Company not found.'
            });
        } else {
            res.status(OK).json({
                success: true,
                data: check.dataValues,
                message: 'Company detail found.'
            });
        }
    } catch (error) {
        console.log('error', error)
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
        var check = await Company.findOne({
            where: {
                id: params.id
            },
        });

        if (check === null) {
            res.status(NOT_FOUND).json({
                success: false,
                data: null,
                message: 'Company not found.'
            });
        } else {
            let deleted = {
                isDeleted: 1
            }
            let cResult = await Company.update(deleted, {
                where: {
                    id: params.id
                }
            }, {
                transaction: t
            });
            let sResult = await StateLicenseInfo.update(deleted, {
                where: {
                    companyId: params.id
                }
            }, {
                transaction: t
            });

            if (cResult[0] && sResult[0]) {
                await t.commit();
                res.status(DELETE).json({
                    success: true,
                    message: 'Company deleted successfully.'
                });
            } else {
                res.status(BAD_REQUEST).json({
                    success: false,
                    message: 'Company not deleted '
                });
            }
        }
    } catch (error) {
        if (t) {
            await t.rollback();
        }

        console.log('error', error)
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}