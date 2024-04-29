import { body } from "express-validator";

export const validateBrand = [
  body("name", "Invalid input")
    .notEmpty()
    .isLength({ max: 30 })
    .isAlphanumeric()
    .toLowerCase(),
];
