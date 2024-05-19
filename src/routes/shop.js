import { Router } from "express";

import {
  getIndex,
  getcategoryProducts,
  getBrandProducts,
} from "../controllers/shop/shop.js";
import {
  getFilteredBrandProducts,
  getFilteredCategoryProducts,
} from "../controllers/shop/filter-products.js";

const router = Router();

router.get("/", getIndex);

router.get("/products/categories/:categoryName", getcategoryProducts);

router.get("/products/brands/:brandName", getBrandProducts);

router.get("/products/categories", getFilteredCategoryProducts);

router.get("/products/brands", getFilteredBrandProducts);

export default router;
