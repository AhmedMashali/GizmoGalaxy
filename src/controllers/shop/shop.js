import { getCategories } from "../../services/shop/categories.js";
import { getBrands } from "../../services/shop/brands.js";
import {
  getCatProducts,
  fetchBrandProducts,
  productsCatCount,
  productsBrandCount,
  brandsFilter,
  stockFilter,
  configOptions,
  filterOptions,
  fetchFilteredProducts,
  colorsFilter,
  getColors,
  prepareBodyData,
  prepareResData,
  productsTotal,
  prepareReqData,
} from "../../services/shop/products.js";

import { productsPerPage } from "../../constants/constants.js";

import Product from "../../models/product.js";

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
    // console.log(filterOptions);

    // console.log(brandsOptions);

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
  const page = +req.query.page[0] || 1;

  try {
    const categories = await getCategories();
    const brands = await getBrands();
    const products = await fetchBrandProducts(brand);
    const productsCount = await productsBrandCount(brand);
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
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getFilteredProducts = async (req, res, next) => {
  const reqData = prepareReqData(req.query);

  let brands = reqData.brands;
  let colors = reqData.colors;
  const page = +reqData.page[0] || 1;

  if (brands) {
    brands = prepareBodyData(brands);
  }

  try {
    // Filter
    const filter = await filterOptions(reqData);

    // Filtered Products
    const products = await fetchFilteredProducts(filter, page);
    const productsCount = await productsTotal(filter);

    // pagenation
    const pagenation = {
      currentPage: page,
      isNextPage: page * productsPerPage < productsCount,
      nextPage: page + 1,
      isPreviousPage: page > 1,
      previousPage: page - 1,
      lastPage: Math.ceil(productsCount / productsPerPage),
      productsCount: productsCount,
    };

    // Stock
    const stockOps = await filterOptions(reqData, true);
    const stock = await stockFilter(stockOps, reqData["stock status"]);

    // brands
    // if (!brands) {
    brands = await getBrands();
    // }
    // console.log(reqData.brands);
    const brandsOps = await brandsFilter(brands, filter, reqData.brands);

    // console.log(brandsOps);

    // colors
    if (!colors) {
      colors = await getColors(filter);
      // console.log(colors);
    }

    const colorsOps = await colorsFilter(colors, filter, reqData.colors);
    // console.log(colorsOps);

    // configurations
    const configsOptions = await configOptions(
      reqData.category,
      filter,
      reqData
    );

    // choose which data to be sent
    console.log(reqData.target);
    const resData = prepareResData(reqData.target[0], [
      stock,
      brandsOps,
      colorsOps,
      ...configsOptions,
    ]);
    // console.log(resData);

    // send it to front
    res.json({
      products,
      filters: resData,
      pagenation: pagenation,
    });
  } catch (err) {
    console.log(err);
  }
};
