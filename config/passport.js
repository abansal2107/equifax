const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const passport = require("passport");
const bcrypt = require("bcrypt");
const models = require("../api/models/index");
const UserModel = models.users;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, cb) {
      console.log("password: ", password);
      console.log("email: ", email);
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      return UserModel.findOne({ where: { email: email }, raw: true })
        .then(async (user) => {
          if (!user) {
            return cb(null, false, { message: "Incorrect email or password." });
          }
          if (user) {
            let passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
              return cb(null, false, {
                message: "Incorrect email or password.",
              });
            }
          }
          return cb(null, user, { message: "Logged In Successfully" });
        })
        .catch((err) => cb(null, err));
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    async (token, done) => {
      try {
        //Pass the user details to the next middleware
        return done(null, token);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);
