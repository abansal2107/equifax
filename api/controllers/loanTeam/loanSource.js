'use strict'


const models = require('../../models/index')
const LoanSourceMaster = models.loan_source_master
const LoanSourceUser = models.loan_source_user

const errorHandler = require('../../../exceptions/error')
const constants = require('../../../config/strings/constant')
const {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    INSERT,
    UPDATE,
    DELETE
} = constants.HTTP_STATUS

exports.getMaster = async function (req, res, next) {
    try {
        var dataValue = await LoanSourceMaster.findAll({});
        if (dataValue.length > 0) {
            res.status(200).json({
                success: true,
                data: dataValue,
                message: 'Loan source found'
            });
        } else {
            res.status(200).json({
                sucee: false,
                message: 'Loan source not found'
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

exports.addLoanSourceUser = async function (req, res, next) {
    let body = req.body;
    try {
        const result = await LoanSourceUser.create(body)
        if (result) {
            res.status(INSERT).json({
                success: true,
                data: body,
                message: 'Great! Loan Source Info info added successfully.'
            });

        } else {
            res.status(BAD_REQUEST).json({
                success: true,
                data: [],
                message: 'Oops! Loan Source Info info not added .'
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

// exports.update = async function(req ,res ,next){
//     let params = req.body;
//     console.log('params',params)

//     try{

//         let where = {id: params.id};
//     console.log('where',where)

//     console.log('+++++++++++++++++++++++++++++1')

//         var check = await Fullfillment.update(params, {where: where});
//     console.log('+++++++++++++++++++++++++++++2')

//         console.log('check',check)
//         if (check[0]) {
//             res.status(UPDATE).json({success: true, data: params, message: 'Fullfillment Updated Successfully....'})
//         }else{
//             res.status(UPDATE).json({success: false,data:[], message: 'Oops! Failed to update Fullfillment'})
//         }
//     }catch(error) {
//         error = await errorHandler.errorCommon(error);
//         res.status(error.status);
//         res.json({
//             message: error.message
//         });  
//     }
// }

// exports.delete = async function(req ,res ,next){
//     try {
//         let params = req.query
//         var check = await Fullfillment.findAll({
//             where: {
//                 id: params.id
//             }
//         });   
//         if ((check.length > 0) ) {
//             await Fullfillment.destroy({ where: { id : params.id}});
//             res.status(DELETE).json({success: true, message: 'Fullfillment Deleted Successfully.'})
//         }else{
//             res.status(DELETE).json({success: true, message: 'Fullfillment not found'});
//         }
//     } catch (error) {
//         error = await errorHandler.errorCommon(error);
//         res.status(error.status);
//         res.json({
//             message: error.message
//         });  
//     }

// }