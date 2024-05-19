import { getCategories } from "../../services/shop/categories.js";
import { getBrands } from "../../services/shop/brands.js";
import {
  getCatProducts,
  fetchBrandProducts,
  productsCatCount,
  productsBrandCount,
  getColors,
} from "../../services/shop/products.js";

import {
  brandsFilter,
  stockFilter,
  configOptions,
  colorsFilter,
  categoriesFilter,
} from "../../services/shop/filter-products/attributes-filters.js";

import { productsPerPage } from "../../constants/constants.js";

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
  const page = +req.query.p || 1;
  const filter = { "category.name": category };
  try {
    const categories = await getCategories();
    const brands = await getBrands();
    const products = await getCatProducts(category, page, productsPerPage);
    const productsCount = await productsCatCount(category);
    const stockOptions = await stockFilter(filter);
    const brandsOptions = await brandsFilter(brands, filter);
    const configsOptions = await configOptions(category, filter, false);
    const colors = await getColors(filter);
    const colorsOptions = await colorsFilter(colors, filter);
    const filterOptions = [
      stockOptions,
      brandsOptions,
      colorsOptions,
      ...configsOptions,
    ];

    return res.render("shop/products", {
      pageTitle: category,
      categories: categories,
      brands: brands,
      products: products,
      productType: category,
      pagePath: "categories",
      currentPage: page,
      isNextPage: page * productsPerPage < productsCount,
      nextPage: page + 1,
      isPreviousPage: page > 1,
      previousPage: page - 1,
      lastPage: Math.ceil(productsCount / productsPerPage),
      productsCount: productsCount,
      filterOptions: filterOptions,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getBrandProducts = async (req, res, next) => {
  const brand = req.params.brandName;
  const page = +req.query.page || 1;
  const filter = { "brands.name": brand };

  try {
    const categories = await getCategories();
    const brands = await getBrands();
    const products = await fetchBrandProducts(brand);
    const productsCount = await productsBrandCount(brand);
    const stockOptions = await stockFilter(filter);
    const colors = await getColors(filter);
    const categoriesOps = await categoriesFilter(categories, filter);
    const colorsOptions = await colorsFilter(colors, filter);
    const filterOptions = [stockOptions, categoriesOps, colorsOptions];
    return res.render("shop/products", {
      pageTitle: brand,
      categories: categories,
      brands: brands,
      products: products,
      productType: brand,
      pagePath: "brands",
      currentPage: page,
      isNextPage: page * productsPerPage < productsCount,
      nextPage: page + 1,
      isPreviousPage: page > 1,
      previousPage: page - 1,
      lastPage: Math.ceil(productsCount / productsPerPage),
      productsCount: productsCount,
      filterOptions: filterOptions,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
