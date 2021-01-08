'use strict'
const { Op } = require("sequelize");
const models = require('../models/index')
const Role = models.roles
const RolesType = models.role_types
const RolePermission = models.role_permissions
const User = models.users
const errorHandler = require('../../exceptions/error')
const constant = require('../../config/strings/constant')
const {
  BAD_REQUEST,
  NOT_FOUND,
  OK,
  INSERT,
  UPDATE,
  DELETE } = constant.HTTP_STATUS

exports.roles = async function (req, res) {
  try {
    let roles = await Role.findAll({
      where: {
        id: req.query.role_id
      },
      include: [{
        model: RolesType,
        as: 'role_types',
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [{
          model: RolePermission,
          as: 'role_permissions',
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }]
      }],
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
    res.status(OK).json({
      success: true,
      data: roles,
      message: ''
    });
  } catch (error) {
    error = await errorHandler.errorCommon(error);
    res.status(error.status);
    res.json({
      message: error.message
    });
  }

}

exports.updateRole = async function (req, res) {

  try {
    let body = req.body;
    let check = false;
    let message = ''

    if (body.type === 'role_group') {
      check = await Roles.update(body, {
        where: {
          id: body.id
        }
      })
    } else {
      check = await RolePermission.update(body, {
        where: {
          id: body.id
        }
      })
    }

    if (check) {
      message = 'Great! permission updated successfully.'
    } else {
      message = 'Oops! failed to update.'
    }
    res.status(UPDATE).json({
      success: true,
      message: message
    });
  } catch (error) {
    error = await errorHandler.errorCommon(error);
    res.status(error.status);
    res.json({
      message: error.message
    });
  }
}

// To get active user roles.
exports.roleUsers = async function (req, res) {
  try {
    var users = await Role.findAll({
      where: {
        status: '1',
        id:{[Op.notIn]:[1]},
        section: {
          [Op.like]: '%' + req.query.section + '%'
      },
      }
    })

    if (users.length > 0) {
      res.status(OK).json({
        success: true,
        data: users,
        message: 'User roles found.'
      });
    } else {
      res.status(OK).json({
        success: false,
        message: 'User roles not found.'
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

exports.userByRoles = async function (req, res) {
  try {
    let roleWhere=''
    if(req.query.title){
      roleWhere={
        title:   req.query.title 
      }
    }else{
      roleWhere={
        department:   req.query.department 
      }
    }

    var users = await User.findAll({
      where: {
        status: '1',
      },
      include: {
        model:Role,
        where:roleWhere
      }
    })

    if (users.length > 0) {
      res.status(OK).json({
        success: true,
        data: users,
        message: 'User found.'
      });
    } else {
      res.status(OK).json({
        success: false,
        message: 'User not found.'
      });
    }

  } catch (error) {
    console.log('error',error)
    error = await errorHandler.errorCommon(error);
    res.status(error.status);
    res.json({
      message: error.message
    });
  }
}