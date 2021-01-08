"use strict";

const { check, validationResult } = require("express-validator");

// var User = require('../../models/user/User')

const errorHandler = require("../../../exceptions/error");
const models = require("../../models/index");
var User = models.users;
var Roles = models.roles;

const constants = require("../../../config/strings/constant");
const {
  BAD_REQUEST,
  NOT_FOUND,
  OK,
  INSERT,
  UPDATE,
  DELETE,
  USER_ATTRIBUTES,
} = constants.HTTP_STATUS;

// To asign sales role get MLO, MLOA, MLO, Manager, Super User
exports.salesUserRoles = async function (req, res) {
  try {
    let users = await User.findAll({
      where: {
        role_category_id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], //Super User, MLO, MLOA, Manager
        status: "1",
      },
      include: Roles,
      attributes: USER_ATTRIBUTES,
    });

    if (users.length > 0) {
      res
        .status(OK)
        .json({ success: true, data: users, message: "Users found." });
    } else {
      res
        .status(OK)
        .json({ success: false, data: [], message: "Users not found." });
    }
  } catch (error) {
    error = await errorHandler.errorCommon(error);
    res.status(error.status);
    res.json({
      message: error.message,
    });
  }
};

exports.assignSalesUser = async function (req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  res.status(OK).json({ success: true, data: [], message: "User assigned" });
};
