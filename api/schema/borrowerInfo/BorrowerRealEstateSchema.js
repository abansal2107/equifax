'use strict';
const Joi = require('@hapi/joi');
module.exports = {

    getRealEstateOwned: Joi.object().keys({
        page: Joi.number().required()

    }),

    id: Joi.object().keys({
        id: Joi.number().required()

    }),



    //new address
    addRealEstateOwned: Joi.object().keys({
        newAddress: Joi.object().keys({
            street: Joi.string().trim().allow(''),
            unit: Joi.string().trim().allow(''),
            city: Joi.string().trim().allow(''),
            state: Joi.string().trim().allow(''),
            zip: Joi.string().trim().allow(''),
            country: Joi.string().trim().allow('')
        }),

        //borrower address
        borrowerAddress: Joi.object().keys({
            borrowerinfoId: Joi.number().required(),
            addressType: Joi.string().valid(['current', 'former', 'mailing']).trim().required(),
            addressId: Joi.number().allow('')
        }),

        // property info
        // propertyInfo: Joi.object().keys({
        //     borrowerinfoId: Joi.number().required(),
        //     propertyValue: Joi.number().required(),
        //     status: Joi.string().valid(['sold', 'pendingSale', 'Retained']).trim().required(),
        //     intendedOccupancy: Joi.string().valid(['investment', 'primaryResidence', 'secondHome', 'other']).trim().required(),
        //     monthlyInsuranceTaxesAssoc: Joi.number().required(),
        //     monthlyRentalIncome: Joi.number(),
        //     netMonthlyRentalIncome: Joi.number()
        // }),

        //mortgage loan info
    //     mortgageInfo: Joi.object().keys({
    //         borrowerinfoId: Joi.number().required(),
    //         creditorName: Joi.string().trim().required(),
    //         unpaidBalance: Joi.number().required(),
    //         accountNumber: Joi.number().allow(''),
    //         monthlyMortgagePayment: Joi.number().allow(''),
    //         toBePaidOfAt: Joi.number().valid(['0', '1']).required(),
    //         mortgageType: Joi.string().valid(['fha', 'va', 'conventional', 'usda-rd', 'other']).trim(),
    //         creditLimit: Joi.number().allow('')
    //     }),
    // }),


    updateRealEstateOwned: Joi.object().keys({
        newAddress: Joi.object().keys({
            id: Joi.number().required(),
            street: Joi.string().trim().allow(''),
            unit: Joi.string().trim().allow(''),
            city: Joi.string().trim().allow(''),
            state: Joi.string().trim().allow(''),
            zip: Joi.string().trim().allow(''),
            country: Joi.string().trim().allow('')
        }),

        //borrower address
        borrowerAddress: Joi.object().keys({
            id: Joi.number().required(),
            borrowerinfoId: Joi.number().required(),
            addressType: Joi.string().valid(['current', 'former', 'mailing']).trim().required(),
            addressId: Joi.number().required()
        }),

        // property info
        propertyInfo: Joi.object().keys({
            id: Joi.number().required(),
            borrowerinfoId: Joi.number(),
            propertyValue: Joi.number(),
            status: Joi.string().valid(['sold', 'pendingSale', 'Retained']).trim(),
            intendedOccupancy: Joi.string().valid(['investment', 'primaryResidence', 'secondHome', 'other']).trim(),
            monthlyInsuranceTaxesAssoc: Joi.number(),
            monthlyRentalIncome: Joi.number(),
            netMonthlyRentalIncome: Joi.number()
        }),

        //mortgage loan info
        mortgageInfo: Joi.object().keys({
            borrowerinfoId: Joi.number(),
            creditorName: Joi.string().trim(),
            unpaidBalance: Joi.number(),
            accountNumber: Joi.number().allow(''),
            monthlyMortgagePayment: Joi.number().allow(''),
            toBePaidOfAt: Joi.number().valid(['0', '1']),
            mortgageType: Joi.string().valid(['fha', 'va', 'conventional', 'usda-rd', 'other']).trim(),
            creditLimit: Joi.number().allow('')
        }),
    }),

    })

};