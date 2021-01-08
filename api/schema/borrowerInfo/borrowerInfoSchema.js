'use strict';
const Joi = require('@hapi/joi');

module.exports = {
    //ASSET

    id: Joi.object().keys({
        id: Joi.number().allow('').required()
    }),

    addBorrowerInfo: Joi.object().keys({

        //borrowerInfo
        borrowerInfo: Joi.object().keys({
            loanAppNo: Joi.string().trim().required(),
            firstName: Joi.string().trim().required(),
            middleName: Joi.string().trim().required(),
            lastName: Joi.string().trim().required(),
            suffix: Joi.string().trim().required(),
            ssn: Joi.number().required(),
            dob: Joi.date().iso().required(),
            citizenship: Joi.string().trim().required(),
            maritalStatus: Joi.number().valid([1, 2, 3]).required(),
            noOfDependantChilds: Joi.number().required(),
            agesDependantChilds: Joi.date().iso().required(),
            contactInfo: Joi.string().trim().required(),

        }),

        // Other borrower 
        borrowerOthers: Joi.object().keys({
            loanAppNo: Joi.string().trim().required(),
            firstName: Joi.string().trim().required(),
            middleName: Joi.string().trim().required(),
            lastName: Joi.string().trim().required(),
            suffix: Joi.string().trim().required(),

        }),

        // Type of credit
        typeOfCredit: Joi.object().keys({
            type:Joi.number().valid([1, 2]).required(),
            noOfBorrowers:Joi.number(),
            initials:Joi.string().trim(),

        }),

        //Borrower Address
        address: Joi.object().keys({
            street: Joi.string().trim().allow('').required(),
            unit: Joi.string().trim().allow('').required(),
            city: Joi.string().trim().allow('').required(),
            state: Joi.string().trim().allow('').required(),
            zip: Joi.string().trim().allow('').required(),
            country: Joi.string().trim().allow('').required(),

        }),

        //borrower married
        borrowerMartial: Joi.object().keys({
            OtherPerson:Joi.number().valid([0,1]).required(),
            TypeOfRelationship:Joi.number().valid([1, 2, 3,4]).required(),
            State:Joi.string().trim().allow('').required(),
            // housing:Joi.string().trim().allow('').required(),
            Other:Joi.string().trim().allow('').required(),
        }),

            //borrower address
            borrowerAddress: Joi.object().keys({
                type:Joi.number().valid([0,1]).required(),
                // howLongAtCurrentAddress:Joi.number().required(),
                // housing:Joi.number().allow('').required(),
                // rentPerMonth:Joi.number().allow('').required(),
            }),
    }),

    details: Joi.object().keys({
        loanAppNo: Joi.number().allow('').required(),
        role_id:Joi.number().allow('').required()
    }),
}