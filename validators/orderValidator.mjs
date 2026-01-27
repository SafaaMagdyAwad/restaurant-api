import { body } from "express-validator";

export const createOrderValidation = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("Order must contain at least one item"),
  
  body("items.*.menuItemId")
    .notEmpty()
    .withMessage("Menu item ID is required"),
  
  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
  
  body("orderType")
    .notEmpty()
    .withMessage("Order type is required")
    .isIn(["delivery", "pickup"])
    .withMessage("Order type must be delivery or pickup"),
];
