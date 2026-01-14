import { body } from "express-validator";

//authentication
const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required!")
      .isEmail()
      .withMessage("Email is invalid!"),
    body("userName")
      .trim()
      .notEmpty()
      .withMessage("User name is required!")
      .isLength({ min: 4 })
      .withMessage("User name must be at least 4 characters long!")
      .isLowercase()
      .withMessage("Use small letters for User name!"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required!")
      .isLength({ min: 6, max: 12 })
      .withMessage("Password must be 6 to 12 characters long!"),
  ];
};

const userLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required!")
      .isEmail()
      .withMessage("Email is invalid!"),
    body("password").notEmpty().withMessage("Password is required!"),
  ];
};

const userForgotPasswordValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required!")
      .isEmail()
      .withMessage("Email is invalid!"),
  ];
};

const userResetForgotPasswordValidator = () => {
  return [
    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("New password is required!")
      .isLength({ min: 6, max: 12 })
      .withMessage("Password must be 6 to 12 characters long!"),
  ];
};

const userChangeCurrentPasswordValidator = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old password is required!"),
    body("newPassword")
      .notEmpty()
      .withMessage("New password is required!")
      .isLength({ min: 6, max: 12 })
      .withMessage("Password must be 6 to 12 characters long!"),
  ];
};

//board
const boardCreateOrUpdateValidator = () => {
  return [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required!")
      .isLength({max: 50})
      .withMessage("Title should be 50 characters long at max!"),
  ]
}

//invite
const invitationValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required!")
      .isEmail()
      .withMessage("Invalid email!")
  ]
}

export {
  userRegisterValidator,
  userLoginValidator,
  userForgotPasswordValidator,
  userResetForgotPasswordValidator,
  userChangeCurrentPasswordValidator,
  boardCreateOrUpdateValidator,
  invitationValidator,
};
