'use strict'

// const Role = require('../models/role/Role')
// const RoleType = require('../models/role/RoleType')
// const RolePermission = require('../models/role/RolePermission')
const errorHandler = require('../../exceptions/error')
const constants = require('../../config/strings/constant')
const {BAD_REQUEST,  NOT_FOUND,  OK,  INSERT,  UPDATE,  DELETE} = constants.HTTP_STATUS
const models = require('../models/index')
const Role = models.roles
const RoleType = models.role_types
const RolePermission = models.role_permissions

exports.isAuthorize = (role, permission) => {
    return async function(req, res, next){
      if (req.user) {
        // user is authenticated
        console.log(req.originalUrl)
        let user = req.user;
        console.log('user: >>>>>>', user);
  
        let wherePermission = {
          title: role        
        }
  
        if(permission = 'view'){
          wherePermission.view = '1'
        }else if(permission = 'add'){
          wherePermission.add = '1'
        }else if(permission = 'edit'){
          wherePermission.edit = '1'
        }else if(permission = 'del'){
          wherePermission.del = '1'
        }else if(permission = 'detail'){
          wherePermission.detail = '1'
        }
  
        let roleCategory = await Role.findOne({
          where: {
            id: user.role_category_id
          },
          include: [{
            model: RoleType,
            as: 'role_types',
            attributes:{ exclude: ['createdAt','updatedAt'] },
            include: [{            
              model: RolePermission,
              required: true,
              where: wherePermission,
              as: 'role_permissions',
              attributes:{ exclude: ['createdAt','updatedAt'] }
            }]                   
          }]
        })
  
        console.log('roleCategory: ', roleCategory);
        if(roleCategory.role_types.length && roleCategory.role_permissions.length &&roleCategory.role_types[0].role_permissions[0] != undefined){
          return next();
        }else{
          return res.status(401).json({success: false, message: 'You are not authorize to use this feature.'});
        }
              
        //next();
      } else {
        // return unauthorized    
        return res.status(401).json('Unauthorized');
      }
    };

}