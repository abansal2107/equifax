'use strict'

const models = require('../../models/index')
const RolePermissions = models.role_permissions
const errorHandler = require('../../../exceptions/error')
const constants = require('../../../config/strings/constant')



exports.getAuth = async function (req, res, next) {
    console.log('path',req.path)
    let request = ''
    switch (req) {
        case 'GET':
            request=req.query
            break;
        case 'POST':
            request=req.body
            break;
        case 'PUT':
            request=req.body
            break;
        case 'DELETE':
            request=req.query
            break;
        default:
            request=req.query
    }

    console.log('request',request)
    if (request.roleId) {
       const permission = await RolePermissions.findAll({
            where: {
                roleTypeId:request.roleId,
                urlPath:req.path
            },
            raw:true
        })
        console.log('permission',permission)

     
                var allow = false;
                //you can do this mapping of methods to permissions before the db call and just get the specific permission you want. 
                permission.forEach(function (perm) {
        console.log('perm',perm)

                    if (req.method == "POST" && perm.add) allow = true;
                    else if (req.method == "GET" && perm.view) allow = true;
                    else if (req.method == "PUT" && perm.edit) allow = true;
                    else if (req.method == "DELETE" && perm.del) allow = true;

                })
                if (allow) next();
                else res.status(403).send({
                    error: 'access denied'
                });
          //handle your reject and catch here
    } else res.status(400).send({
        error: 'invalid token'
    })
}