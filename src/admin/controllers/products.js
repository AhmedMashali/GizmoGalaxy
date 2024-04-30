import { validationResult } from "express-validator";

import { createProduct, validateConfig } from "../services/products.js";
import { getCategories, getCategory } from "../services/categories.js";
import { getBrands, isBrandExist } from "../services/brands.js";

export const getAddProduct = async (req, res, next) => {
  try {
    const brands = await getBrands();
    const categories = await getCategories();
    return res.render("add-product", {
      pageTitle: "Add Product",
      brands: brands,
      categories: categories,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const postAddProduct = async (req, res, next) => {
  const validateionRes = validationResult(req);
  if (!validateionRes.isEmpty()) {
    return res.send(validateionRes.array()[0].msg);
  }
  try {
    const category = await getCategory(
      req.body.category,
      "name configurations"
    );

    // validate configurations
    if (!category) {
      return res.send("No such category exists");
    }

    // validate brands
    if (!(await isBrandExist(req.body.brands))) {
      return res.send("No such brand exists!");
    }

    // validate images
    if (req.files.length < 1) {
      return res.send("invalid images");
    }

    const configurations = validateConfig(category.configurations, req.body);
    if (!configurations) {
      return res.send("Invalid configurations data");
    }
    await createProduct(
      req.body,
      req.files,
      {
        _id: category._id,
        name: category.name,
      },
      configurations
    );
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
