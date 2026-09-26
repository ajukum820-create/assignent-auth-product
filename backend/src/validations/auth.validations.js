import { body, validationResult } from "express-validator";

//=======================REGISTER VALIDATION====================
export const registerValidtion = [
  //NAME VALIDATIONS================

  body("name")
    .exists()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be in string format")
    .bail()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  //============EMAIL VALIDATIONS===

  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .isString()
    .withMessage("Email must be in string format")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address"),

  //==========PASSWORD VALIDATION====

  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be in string format")
    .bail()
    .trim()
    .isLength({ min: 8, max: 100 })
    .withMessage("Password must be between 8 and 100 characters"),

  //=====================confrim password=======================
  body("confirmPassword")
    .exists()
    .withMessage("Confirm password is required")
    .bail()
    .isString()
    .withMessage("Confirm password must be in string format")
    .bail()
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Password and confirm password do not match");
      }

      return true;
    }),

  //==========ERROR SHOW KARNA=======================

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  },
];

//=====================LOGIN VALIDATION====================
export const loginValidtion = [
  //============EMAIL VALIDATIONS===========================

  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .isString()
    .withMessage("Email must be in string format")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address"),

  //=================PASSWORD VALIDATION=========================

  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be in string format")
    .bail()
    .trim()
    .isLength({ min: 8, max: 100 })
    .withMessage("Password must be between 8 and 100 characters"),

  //======================ERROR SHOW KARNA=======================

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  },
];
