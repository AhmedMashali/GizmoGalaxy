import { productsPerPage } from "../../../constants/constants.js";

export const pagenation = (page, productsCount) => {
  return {
    currentPage: page,
    isNextPage: page * productsPerPage < productsCount,
    nextPage: page + 1,
    isPreviousPage: page > 1,
    previousPage: page - 1,
    lastPage: Math.ceil(productsCount / productsPerPage),
    productsCount: productsCount,
  };
};
