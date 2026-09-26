import { body, validationResult } from "express-validator";

export const createProductValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Product title must be between 2 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 20, max: 500 })
    .withMessage("Product description must be between 20 and 500 characters"),

  body("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .custom((value) => value >= 0)
    .withMessage("Product price cannot be less than 0"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Product category is required"),

  body("size")
    .notEmpty()
    .withMessage("Product size is required")
    .isArray()
    .withMessage("Product size must be an array")
    .custom((sizes) => {
      const validSizes = ["X", "XL", "M", "L", "XXL"];

      return sizes.every((size) => validSizes.includes(size));
    })
    .withMessage("Product size contains an invalid size"),

  body("stock")
    .notEmpty()
    .withMessage("Product stock is required")
    .isInt({ min: 0 })
    .withMessage("Product stock must be a non-negative integer"),

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



// Update validation 
export const updateProductValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Product title must be between 2 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 20, max: 500 })
    .withMessage("Product description must be between 20 and 500 characters"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Product price must be a non-negative number"),

  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Product category cannot be empty"),

  body("size")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Product size must be a non-empty array")
    .custom((sizes) => {
      const validSizes = ["X", "XL", "M", "L", "XXL"];

      return sizes.every((size) => validSizes.includes(size));
    })
    .withMessage("Product size contains an invalid size"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Product stock must be a non-negative integer"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        message: "Product validation failed",
        errors: errors.array(),
      });
    }

    next();
  },
];

