import { Router } from "express";

import {
  getIndex,
  getcategoryProducts,
  getBrandProducts,
  getFilteredProducts,
} from "../controllers/shop/shop.js";

const router = Router();

router.get("/", getIndex);

router.get("/products/categories/:categoryName", getcategoryProducts);

router.get("/products/brands/:brandName", getBrandProducts);

router.get("/products", getFilteredProducts);

// router.post("/products", getFilteredProducts);

export default router;
