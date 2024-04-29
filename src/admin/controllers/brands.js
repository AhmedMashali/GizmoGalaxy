import { validationResult } from "express-validator";

import { isBrandExist, createBrand } from "../services/brands.js";

export const getAddBrand = (req, res, next) => {
  return res.render("admin/add-brand", {
    pageTitle: "Add Brand",
  });
};

export const postBrands = async (req, res, next) => {
  const inputValidation = validationResult(req);

  // Handle invalid input data
  if (!inputValidation.isEmpty()) {
    return res.send(inputValidation.array()[0].msg);
  }

  const { name } = req.body;

  try {
    if (await isBrandExist(name)) {
      // handle exist brand
      return res.send("brand already exists");
    }
    await createBrand(name);
    return res.redirect("/admin");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
