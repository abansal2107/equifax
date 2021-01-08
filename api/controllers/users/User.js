"use strict";
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const BCRYPT_ROUND = parseInt(process.env.BCRYPT_ROUND, 10);
const model = require("../../models/index");
const User = model.users;
const StateAuthorization = model.state_authorizations;

const errorHandler = require("../../../exceptions/error");
const constant = require("../../../config/strings/constant");
const {
  BAD_REQUEST,
  NOT_FOUND,
  OK,
  INSERT,
  UPDATE,
  DELETE,
  UNAUTHORIZED,
  SERVICE_UNAVAILABLE,
} = constant.HTTP_STATUS;

// exports.user = async function(req, res) {

//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() })
//     }

//     var userInfo = new User(req.body);
//     let user = await User.checkUser(req.body.mobile_number);
//     let message = "";

//     if(user == undefined){

//         User.insert(userInfo);
//         user = await User.checkUser(req.body.mobile_number);
//         message = 'Great! You have registered successfully';

//     }else{
//         message = 'Oops! This user is already registered.';
//     }
//     res.status(200).json({success: true, data: user, message: message});
// };

exports.login = async function (req, res) {
  passport.authenticate(
    "local",
    {
      session: false,
    },
    (err, user, info) => {
      if (err || !user) {
        res.status(UNAUTHORIZED).json({
          success: false,
          data: {},
          message: info ? info.message : "Login failed",
        });
      } else {
        req.login(
          user,
          {
            session: false,
          },
          (err) => {
            if (err) {
              res.send(err);
            } else {
              const token = jwt.sign(JSON.stringify(user), "your_jwt_secret");
              res.status(OK).json({
                success: true,
                data: user,
                token: token,
                message: "Login Successfully.",
              });
            }
          }
        );
      }
    }
  )(req, res);
};

exports.users = async function (req, res) {
  try {
    let perPage = 10;
    let skip = 0;
    let page = parseInt(req.query.page);
    if (page > 1) {
      skip = parseInt(perPage * (page - 1));
    }

    var users = await User.findAndCountAll({
      attributes: constant.USER_ATTRIBUTES,
      limit: perPage,
      offset: skip,
    });

    if (users.rows.length > 0) {
      res.status(OK).json({
        success: true,
        data: users.rows,
        count: users.count,
        message: "Users found.",
      });
    } else {
      res.status(OK).json({
        success: false,
        data: [],
        message: "Users not found.",
      });
    }
  } catch (error) {
    error = await errorHandler.errorCommon(error);
    res.status(error.status);
    res.json({
      message: error.message,
    });
  }
};

exports.addUser = async function (req, res) {
  try {
    let { body } = req;

    body.password = bcrypt.hashSync(body.password, BCRYPT_ROUND);
    console.log("body.password: ", body.password);

    let user = {
      full_name: body.full_name,
      role: body.role,
      location: body.location,
      country_code: body.country_code,
      mobile_number: body.mobile_number,
      email: body.email,
      password: body.password,
      status: body.status,
      user_type: body.user_type,
      role_category_id: body.role_category_id,
    };

    const check = await User.findOne({
      where: {
        email: body.email,
      },
      raw: true,
    });
    if (check) {
      res.status(INSERT).json({
        success: true,
        data: [],
        message: "Email already exist.",
      });
    } else {
      const result = await User.create(user);
      if (result) {
        res.status(INSERT).json({
          success: true,
          data: result,
          message: "User added successfully.",
        });
      } else {
        res.status(INSERT).json({
          success: false,
          data: [],
          message: "Oops! Failed to add user.",
        });
      }
    }
  } catch (error) {
    console.log("error: ", error);
    error = await errorHandler.errorCommon(error);
    res.status(error.status);
    res.json({
      message: error.message,
    });
  }
};

exports.updateUser = async function (req, res) {
  try {
    let body = req.body;
    let passwordMatch = true;
    if (body.oldPassword && body.newPassword) {
      let userCheck = await User.findOne({ where: { id: body.id }, raw: true });
      passwordMatch = await bcrypt.compare(
        body.oldPassword,
        userCheck.password
      );
      if (!passwordMatch) {
        res
          .status(SERVICE_UNAVAILABLE)
          .json({
            success: true,
            data: [],
            message: "Password does not match.",
          });
      } else if (passwordMatch) {
        body.password = bcrypt.hashSync(body.newPassword, BCRYPT_ROUND);
      }
    }
    const result = await User.update(body, {
      where: { id: body.id },
      raw: true,
    });
    if (result[0]) {
      // await Company.updateManager({
      //     user_id: body.id,
      //     manager_id: body.manager_id
      // });

      // let state = {
      //     company_id: 1,
      //     state_id: 1,
      //     expiry_date: '2020-02-20',
      //     license_number: 123121,
      //     status: 1
      // };

      // await StateAuthorization.updateState(state);

      res.status(UPDATE).json({
        success: true,
        data: [],
        message: "User updated successfully.",
      });
    } else {
      res.status(UPDATE).json({
        success: false,
        data: [],
        message: "Oops! Failed to add user.",
      });
    }
  } catch (error) {
    console.log("error: ", error);
    error = await errorHandler.errorCommon(error);
    res.status(error.status);
    res.json({
      message: error.message,
    });
  }
};

exports.logout = function (req, res, next) {
  console.log("logout");
};
