'use strict';
const Joi = require('@hapi/joi');
module.exports = {

    getRoles: Joi.object().keys({
        role_id: Joi.number().required()

    }),
    updateRoles: Joi.object().keys({
        id: Joi.number().required(),
        title: Joi.string().trim(),
        view: Joi.number(),
        add: Joi.number(),
        edit: Joi.number(),
        del: Joi.number(),
        detail: Joi.number()

    }),

    userByRoles: Joi.object().keys({
        title: Joi.string().allow('').valid(['Primary MLO', 'MLOA', 'Manager', 
        'Fulfillment Coordinator', 'Fulfillment Manager', 'Compliance Reviewer',
         'Cooperating MLO','Agent','Agent Assistant','Agent Team']).required(),
         department: Joi.string().allow('').valid(['Administrative', 'Sales', 'Fulfillment', 
         'Compliance', 'Agent', 'Team']).required(),
        role_id: Joi.number().required(),
    })
};