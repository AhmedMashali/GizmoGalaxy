import { getCategories } from "../services/categories.js";
import { getBrands } from "../services/brands.js";
import { getCatProducts, fetchBrandProducts } from "../services/products.js";
import {} from "../services/products.js";

export const getIndex = async (req, res, next) => {
  // get brands
  try {
    const categories = await getCategories();
    const brands = await getBrands();
    res.render("index", {
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
    return res.render("products", {
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
  console.log(brand);
  try {
    const categories = await getCategories();
    const brands = await getBrands();
    const products = await fetchBrandProducts(brand);
    console.log(products);
    return res.render("products", {
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
