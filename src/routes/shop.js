import { Router } from "express";

import {
  getIndex,
  getcategoryProducts,
  getBrandProducts,
} from "../controllers/shop/shop.js";

const router = Router();

router.get("/", getIndex);

router.get("/products/categories/:categoryName", getcategoryProducts);

router.get("/products/brands/:brandName", getBrandProducts);

export default router;
