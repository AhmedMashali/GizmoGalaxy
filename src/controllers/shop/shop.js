import { getCategories } from "../../services/shop/categories.js";
import { getBrands } from "../../services/shop/brands.js";
import {
  getCatProducts,
  fetchBrandProducts,
} from "../../services/shop/products.js";
import {} from "../../services/shop/products.js";

export const getIndex = async (req, res, next) => {
  // get brands
  try {
    const categories = await getCategories();
    const brands = await getBrands();
    res.render("shop/index", {
      pageTitle: "Gizmo Galaxy",
      categories: categories,
      brands: brands,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getcategoryProducts = async (req, res, next) => {
  const category = req.params.categoryName;
  try {
    const categories = await getCategories();
    const brands = await getBrands();
    const products = await getCatProducts(category);
    return res.render("shop/products", {
      pageTitle: category,
      categories: categories,
      brands: brands,
      products: products,
      productType: category,
      pagePath: "Categories",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getBrandProducts = async (req, res, next) => {
  const brand = req.params.brandName;
  try {
    const categories = await getCategories();
    const brands = await getBrands();
    const products = await fetchBrandProducts(brand);
    return res.render("shop/products", {
      pageTitle: brand,
      categories: categories,
      brands: brands,
      products: products,
      productType: brand,
      pagePath: "Brands",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
