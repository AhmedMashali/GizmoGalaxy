import {
  fetchFilteredProducts,
  productsTotal,
} from "../../services/shop/products.js";

import { prepareReqData } from "../../services/shop/filter-products/prepare-data.js";

import { filter } from "../../services/shop/filter-products/filter.js";
import { pagenation } from "../../services/shop/filter-products/pagenation.js";
import {
  brandFiltersOptions,
  categoryFiltersOptions,
} from "../../services/shop/filter-products/filter-options.js";

export const getFilteredCategoryProducts = async (req, res, next) => {
  const reqData = prepareReqData(req.query);
  const page = +reqData.page[0] || 1;
  try {
    // Filter
    const filterData = await filter(reqData);

    // Filtered Products
    const products = await fetchFilteredProducts(filterData, page);
    const productsCount = await productsTotal(filterData);

    // pagenation
    const filterPagenation = pagenation(page, productsCount);

    const resData = await categoryFiltersOptions(reqData, filterData);

    // send it to front
    res.json({
      products,
      filters: resData,
      pagenation: filterPagenation,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getFilteredBrandProducts = async (req, res, next) => {
  const reqData = prepareReqData(req.query);
  const page = +reqData.page[0] || 1;
  // const brand = reqData.brand[0];
  try {
    // Filter
    let filterData = await filter(reqData);

    // Filtered Products
    const products = await fetchFilteredProducts(filterData, page);
    const productsCount = await productsTotal(filterData);

    // pagenation
    const filterPagenation = pagenation(page, productsCount);

    const resData = await brandFiltersOptions(reqData, filterData);
    // send it to front
    res.json({
      products,
      filters: resData,
      pagenation: filterPagenation,
    });
  } catch (err) {
    console.log(err);
  }
};
