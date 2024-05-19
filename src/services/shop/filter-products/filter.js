import Category from "../../../models/category.js";

export const filter = async (bodyData, stockFilter) => {
  try {
    const filter = {};

    if (bodyData.pageType[0] === "categories") {
      filter["category.name"] = bodyData.category;
    }

    if (bodyData.pageType[0] === "brands") {
      filter["brands.name"] = bodyData.brandMain;
    }

    if (
      bodyData["stock status"] &&
      bodyData["stock status"][0] === "in stock" &&
      !stockFilter
    ) {
      filter.stock = { $gt: "0" };
    }

    if (bodyData.brands) {
      filter["brands.name"] = { $in: bodyData.brands };
    }

    if (bodyData.colors) {
      filter.color = { $in: bodyData.colors };
    }

    if (bodyData.category) {
      filter["category.name"] = bodyData.category[0];
      const configurations = await Category.findOne({
        name: bodyData.category[0],
      }).select("configurations -_id");
      // console.log(configurations);
      configurations.configurations.forEach((conf) => {
        if (bodyData[`${conf}`]) {
          filter[`configurations.${conf}`] = { $in: bodyData[`${conf}`] };
        }
      });
    }

    if (bodyData.categories) {
      filter["category.name"] = { $in: bodyData.categories };
    }
    return filter;
  } catch (err) {
    throw err;
  }
};
