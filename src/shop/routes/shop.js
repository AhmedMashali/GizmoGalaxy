import { Router } from "express";

import { getIndex } from "../controllers/shop.js";

const router = Router();

router.get("/", getIndex);

export default router;
