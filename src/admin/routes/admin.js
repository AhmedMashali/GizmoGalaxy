import { Router } from "express";
import { getIndex } from "../controllers/admin.js";

import { getAddBrand, postBrands } from "../controllers/brands.js";
import {
  getAddCategory,
  postCategories,
  getCategoryConfigurations,
} from "../controllers/categories.js";
import { getAddProduct, postAddProduct } from "../controllers/products.js";

import { upload } from "../middlewares/multer.js";
import {
  validateBrand,
  validateCategory,
  validateProduct,
} from "../validations/adminValidator.js";

const router = Router();

router.get("/", getIndex);

router.get("/brands/new-brand", getAddBrand);

router.post("/brands", validateBrand, postBrands);

router.get("/categories/new-category", getAddCategory);

router.post("/categories", validateCategory, postCategories);

router.get("/products/new-product", getAddProduct);

router.get("/categories/:categoryName", getCategoryConfigurations);

router.post(
  "/products",
  upload.array("images"),
  validateProduct,
  postAddProduct
);

export default router;
