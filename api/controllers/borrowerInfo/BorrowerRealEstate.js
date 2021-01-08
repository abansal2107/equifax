const sequelize = require('../../../db/connection');

// const BorrowerAddresses = require('../../models/borrowerInfo/BorrowerAddress');
// const BorrowerRealEstateProperties = require('../../models/borrowerInfo/BorrowerRealEstateProperties');
// const BorrowerRealEstateMortgageLoans = require('../../models/borrowerInfo/BorrowerRealEstateMortgageLoans');
const constant = require('../../../config/strings/constant');
const errorHandler = require('../../../exceptions/error');

const models = require('../../models/index');
const Address = models.addresses;
const BorrowerAddresses = models.borrower_addresses
const BorrowerInfo = models.borrower_info;
const BorrowerRealEstateProperties = models.borrower_reale_state_properties;
const BorrowerRealEstateMortgageLoans = models.borrower_reale_state_mortgage_loans;





exports.addBorrowerRealEstateOwned = async function (req, res, next) {
    try {
        let body = req.body;
        let addressResult = ''
        let borrowerAddressesResult = ''
        let borrowerRealEstatePropertiesResult = ''
        let borrowerRealEstateMortgageLoansResult = ''

        if (body && body.borrowerAddress && !body.borrowerAddress.addressId) {
            addressResult = await Address.create(body.newAddress);
            body.borrowerAddress.addressId = addressResult.dataValues.id
        }

        if (body &&  body.borrowerAddress) {
            body.borrowerAddress.type = body.borrowerAddress.addressType
            borrowerAddressesResult = await BorrowerAddresses.create(body.borrowerAddress);

        }

        if (body && body.propertyInfo) {
            borrowerRealEstatePropertiesResult = await BorrowerRealEstateProperties.bulkCreate(body.propertyInfo, {returning: true})
        }

        if (body && body.mortgageInfo) {
            body.mortgageInfo.type = body.mortgageInfo.mortgageType
            borrowerRealEstateMortgageLoansResult = await BorrowerRealEstateMortgageLoans.bulkCreate(body.mortgageInfo, {returning: true})
        }

        if ( borrowerRealEstateMortgageLoansResult[0].dataValues) {
            res.status(constant.HTTP_STATUS.INSERT).json({
                success: false,
                data: body,
                message: 'Real Estate added successfully.'
            });
        } else {
            res.status(constant.HTTP_STATUS.INSERT).json({
                success: false,
                data: null,
                message: 'Real Estate not added.'
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

exports.getBorrowerRealEstateOwnedDetails = async function (req, res, next) {
    try {
        let id = req.query.id
        
        const result = await BorrowerInfo.findAll({
            where: {
                id: id
            },
            include: [
                {model: Address},
                {model: BorrowerRealEstateProperties},
                {model: BorrowerRealEstateMortgageLoans}
       ]
        })

        res.status(constant.HTTP_STATUS.OK).json({
            success: true,
            data: result,
            // message: 'Real Estate added successfully.'
        });
    } catch (error) {
        console.log('error: ', error);
        error = await errorHandler.errorCommon(error);
        res.status(error.status);
        res.json({
            message: error.message
        });
    }
}




exports.updateBorrowerRealEstateOwnedDetails = async function (req, res, next) {
    try {
        let body = req.body;
        let result = ''

        if (body && body.borrowerAddress && !body.borrowerAddress.addressId) {
            addressResult = await Address.update(
                body.newAddress,
                { where: { id: body.newAddress.id } }
              );
              result =addressResult
        }

        if (body &&  body.borrowerAddress) {
            if(body.borrowerAddress.addressType ){
                body.borrowerAddress.type = body.borrowerAddress.addressType 

            }
            borrowerAddressesResult = await BorrowerAddresses.update(
                body.borrowerAddress,
                { where: { id: body.borrowerAddress.id } }
              );
              result =borrowerAddressesResult

        }

        if (body && body.propertyInfo) {
            borrowerRealEstatePropertiesResult = await BorrowerRealEstateProperties.update(
                body.propertyInfo,
                { where: { id: body.propertyInfo.id } }
              );
              result =borrowerRealEstatePropertiesResult

        }

        if (body && body.mortgageInfo) {
            if(body.mortgageInfo.mortgageType){
                body.mortgageInfo.type = body.mortgageInfo.mortgageType
            }
            borrowerRealEstateMortgageLoansResult = await BorrowerRealEstateMortgageLoans.update(
                body.mortgageInfo,
                { where: { id: body.mortgageInfo.id } }
              );
              result =borrowerRealEstateMortgageLoansResult
        }

        if (result[0]) {
            res.status(constant.HTTP_STATUS.UPDATE).json({
                success: false,
                data: body,
                message: 'Real Estate updated successfully.'
            });
        } else {
            res.status(constant.HTTP_STATUS.UPDATE).json({
                success: false,
                data: null,
                message: 'Real Estate not updated.'
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
