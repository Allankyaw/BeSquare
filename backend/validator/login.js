const { body } = require("express-validator");

const validateLogin = [
  body("email", "Email is required").not().isEmpty(),
  //   body("email", "Please input a valid email").isEmail(),
  body("password", "Password must be minimum 2 characters").isLength({
    min: 2,
  }),
];

module.exports = validateLogin;
