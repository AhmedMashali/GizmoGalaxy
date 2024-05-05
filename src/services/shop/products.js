import Product from "../../models/product.js";

export const getCatProducts = (category) => {
  return Product.find({ "category.name": category }).select(
    "title price images"
  );
};

export const fetchBrandProducts = (brand) => {
  return Product.find({ "brands.name": brand }).select("title price images");
};
