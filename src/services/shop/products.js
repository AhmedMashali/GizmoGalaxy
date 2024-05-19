import { productsPerPage } from "../../constants/constants.js";
import Category from "../../models/category.js";
import Product from "../../models/product.js";

export const getCatProducts = (category, page, productsPerPage) => {
  return Product.find({ "category.name": category })
    .select("title price images")
    .skip((page - 1) * productsPerPage)
    .limit(productsPerPage);
};

export const fetchBrandProducts = (brand) => {
  return Product.find({ "brands.name": brand }).select("title price images");
};

export const productsCatCount = (category) => {
  return Product.countDocuments({
    "category.name": category,
  });
};

export const productsBrandCount = (brand) => {
  return Product.countDocuments({
    "brands.name": brand,
  });
};

export const getColors = (filter) => {
  return Product.find(filter).distinct("color");
};

export const fetchFilteredProducts = (filter, page) => {
  return Product.find(filter)
    .skip((page - 1) * productsPerPage)
    .limit(productsPerPage);
};

export const productsTotal = (filter) => {
  return Product.countDocuments(filter);
};
