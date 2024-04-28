import { Router } from "express";
import {
  getIndex,
  getAddBrand,
  postBrands,
  getAddCategory,
  postCategories,
  getAddProduct,
  getCategory,
  postAddProduct,
} from "../controllers/admin.js";

const router = Router();

router.get("/", getIndex);

router.get("/brands/new-brand", getAddBrand);

router.post("/brands", postBrands);

router.get("/categories/new-category", getAddCategory);

router.post("/categories", postCategories);

router.get("/products/new-product", getAddProduct);

router.get("/categories/:categoryName", getCategory);

router.post("/products", postAddProduct);

export default router;
