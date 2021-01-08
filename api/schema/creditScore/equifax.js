'use strict';
const Joi = require('@hapi/joi');
module.exports = {

 

    submitRequest: Joi.object().keys({


        SUBMITTING_PARTY_Name:Joi.string().trim().required(),
        LenderCaseIdentifier:Joi.string().trim().required(),
        CreditReportType:Joi.string().valid(['Merge','RMCR']).trim().required(),
    
        BorrowerID:Joi.string().trim().required(),

        Borrower:Joi.object().required(),
        _EquifaxIndicator:Joi.string().trim().required(),
        _ExperianIndicator:Joi.string().trim().required(),
        _TransUnionIndicator:Joi.string().trim().required(), 

    }),

    preCloseSubmit:Joi.object().keys({


        SUBMITTING_PARTY_Name:Joi.string().trim().required(),
        LenderCaseIdentifier:Joi.string().trim().required(),
        CreditReportIdentifier:Joi.string().trim().required(),
        CreditReportTypeOtherDescription:Joi.string().valid(['Preclose','Compare']).trim().required(),
        CreditRequestDateTime:Joi.string().trim().required(),
        BorrowerID:Joi.string().trim().required(),

        Borrower:Joi.object().required(),
        _EquifaxIndicator:Joi.string().trim().required(),
        _ExperianIndicator:Joi.string().trim().required(),
        _TransUnionIndicator:Joi.string().trim().required(), 

    }),



    
    singleUpgradeAdd: Joi.object().keys({
        SUBMITTING_PARTY_Name:Joi.string().trim().required(),
        LenderCaseIdentifier:Joi.string().trim().required(),
        
        // have to remove valid check in future CreditReportIdentifier
        CreditReportIdentifier:Joi.string().valid(['J00X00','J00WY2','J00WW4']).trim().required(),
    
        BorrowerID:Joi.string().trim().required(),
        Borrower:Joi.object().required(),
        _EquifaxIndicator:Joi.string().trim().required(),
        _ExperianIndicator:Joi.string().trim().required(),
        _TransUnionIndicator:Joi.string().trim().required(), 

    }),
};