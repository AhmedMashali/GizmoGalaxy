import { body, check } from "express-validator";
import { getConfigurations } from "../services/admin/categories.js";

export const validateBrand = [
  body("name", "Invalid input")
    .notEmpty()
    .isLength({ max: 30 })
    .isAlphanumeric()
    .toLowerCase(),
];

export const validateCategory = [
  body("name", "invalid input")
    .notEmpty()
    .isLength({ max: 30 })
    .isAlphanumeric()
    .toLowerCase(),
  body("configurations", "invalid input").notEmpty(),
  body("configurations.*", "invalid input")
    .isLength({ max: 30 })
    .isAlphanumeric()
    .toLowerCase(),
];

export const validateProduct = [
  check("name", "invalid name").notEmpty().isLength({ max: 100 }),
  check("title", "invalid title").notEmpty().isLength({ max: 300 }),
  check("price", "invalid price").notEmpty().isFloat({ min: 0 }),
  check("stock", "invalid stock").notEmpty().isInt({ min: 0, max: 100 }),
  check("color", "invalid color").notEmpty(),
  check("brands", "invalid brands").notEmpty(),
  check("category", "invalid category").notEmpty(),
  check("description", "invalid description")
    .notEmpty()
    .isLength({ min: 10, max: 500 }),
];
