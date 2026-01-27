import { body } from "express-validator";

export const createReservationValidation = [
  body("customerName")
    .notEmpty()
    .withMessage("Customer name is required"),

  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isMobilePhone("any")
    .withMessage("Phone number is invalid"),

  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .toDate()
    .withMessage("Date must be a valid date"),

  body("time")
    .notEmpty()
    .withMessage("Time is required"),

  body("guests")
    .notEmpty()
    .withMessage("Guests is required")
    .isInt({ min: 1 })
    .withMessage("Guests must be at least 1"),
];
