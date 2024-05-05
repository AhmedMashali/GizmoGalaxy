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
