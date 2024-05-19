import { getBrands } from "../brands.js";

import { filter } from "./filter.js";

import { getColors } from "../products.js";

import { prepareResData } from "./prepare-data.js";

import {
  brandsFilter,
  stockFilter,
  colorsFilter,
  configOptions,
  categoriesFilter,
} from "./attributes-filters.js";
import { getCategories } from "../categories.js";

export const categoryFiltersOptions = async (reqData, filterData) => {
  let brands = reqData.brands;
  let colors = reqData.colors;
  try {
    // Stock
    const stockOps = await filter(reqData, true);
    const stock = await stockFilter(stockOps, reqData["stock status"]);

    // brands
    // if (!brands) {
    brands = await getBrands();
    // }
    // console.log(reqData.brands);
    const brandsOps = await brandsFilter(brands, filterData, reqData.brands);

    // console.log(brandsOps);

    // colors
    if (!colors) {
      colors = await getColors(filterData);
      // console.log(colors);
    }

    const colorsOps = await colorsFilter(colors, filterData, reqData.colors);
    // console.log(colorsOps);

    // configurations
    const configsOptions = await configOptions(
      reqData.category,
      filterData,
      reqData
    );

    // choose which data to be sent

    const resData = prepareResData(reqData.target[0], [
      stock,
      brandsOps,
      colorsOps,
      ...configsOptions,
    ]);
    return resData;
  } catch (err) {
    throw err;
  }
};

export const brandFiltersOptions = async (reqData, filterData) => {
  let colors = reqData.colors;
  try {
    // Stock
    const stockOps = await filter(reqData, true);
    const stock = await stockFilter(stockOps, reqData["stock status"]);

    // colors
    if (!colors) {
      colors = await getColors(filterData);
    }

    const colorsOps = await colorsFilter(colors, filterData, reqData.colors);

    const categories = await getCategories();

    const categoriesOps = await categoriesFilter(
      categories,
      filterData,
      reqData.categories
    );
    // choose which data to be sent

    const resData = prepareResData(reqData.target[0], [
      stock,
      colorsOps,
      categoriesOps,
    ]);

    return resData;
  } catch (err) {
    throw err;
  }
};
