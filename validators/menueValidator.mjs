import { body } from "express-validator";

export const addMenuItemValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name should be at least 2 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),

  body("tags.*")
    .optional()
    .isString()
    .withMessage("Each tag must be a string"),
];

export const updateMenuItemValidation = [
  body("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Name should be at least 2 characters"),

  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  body("category")
    .optional()
    .notEmpty()
    .withMessage("Category cannot be empty"),
  body("isAvailable")
    .optional()
    .notEmpty()
    .withMessage("must have a value")
    .isBoolean()
    .withMessage("must be boolean"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),

  body("tags.*")
    .optional()
    .isString()
    .withMessage("Each tag must be a string"),
];
