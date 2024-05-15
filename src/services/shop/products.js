import { productsPerPage } from "../../constants/constants.js";
import Category from "../../models/category.js";
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

export const brandsFilter = async (brands, filter, checkedItems) => {
  let brandsf = { ...filter };
  let updatedBrands = [];
  if (brandsf["brands.name"]) {
    delete brandsf["brands.name"];
  }
  // console.log(filter);
  try {
    for (let brand of brands) {
      const countBrand = await Product.countDocuments({
        "brands.name": brand.name,
        ...brandsf,
      });
      if (countBrand > 0) {
        brand = { name: brand.name, count: countBrand };
        // checked here

        if (checkedItems && checkedItems.find((ele) => ele === brand.name)) {
          brand.status = "checked";
        }
        updatedBrands.push(brand);
      }
    }
    return { name: "brands", type: "checkbox", values: updatedBrands };
  } catch (err) {
    throw err;
  }
};

export const stockFilter = async (filter, stockStatus) => {
  try {
    const allProducts = await Product.countDocuments(filter);
    const inStock = await Product.countDocuments({
      ...filter,
      stock: { $gt: 0 },
    });
    let stockRes = {
      name: "stock status",
      type: "radio",
      values: [
        { name: "all products", count: allProducts },
        { name: "in stock", count: inStock },
      ],
    };

    if (!stockStatus || stockStatus[0] === "all products") {
      stockRes.values[0].status = "checked";
      return stockRes;
    }
    stockRes.values[1].status = "checked";
    return stockRes;
  } catch (err) {
    throw err;
  }
};

export const colorsFilter = async (colors, filter, checkedItems) => {
  let colorsOps = { name: "colors", values: [], type: "checkbox" };
  let colorsf = { ...filter };

  if (colorsf.color) {
    delete colorsf.color;
  }

  try {
    for (let color of colors) {
      let countColor = await Product.countDocuments({
        ...colorsf,
        color: color,
      });
      const colorData = { name: color, count: countColor };
      if (checkedItems && checkedItems.find((ele) => ele === color)) {
        colorData.status = "checked";
      }

      colorsOps.values.push(colorData);
    }
    return colorsOps;
  } catch (err) {
    throw err;
  }
};

export const getColors = (filter) => {
  return Product.find(filter).distinct("color");
};

export const configOptions = async (categoryName, filter, bodyData) => {
  let configs = [];
  let configsCount = [];
  let configsFilter = [];
  try {
    const configurations = await Category.findOne({
      name: categoryName,
    }).select("configurations -_id");

    for (let conf of configurations.configurations) {
      // const confCount = await Product.find().distinct(`configurations.${conf}`);
      const confCount = await Product.find({
        "category.name": categoryName,
      }).distinct(`configurations.${conf}`);
      // console.log(confCount);
      const confData = { name: conf, values: confCount };

      configs.push(confData);
    }

    // console.log(configs);

    for (let config of configs) {
      for (let value of config.values) {
        const key = `configurations.${config.name}`;
        const s = {};
        s[`${key}`] = value;
        const confCount = await Product.countDocuments({
          ...filter,
          ...s,
        });
        let confElement = { name: value, count: confCount };
        if (
          bodyData[config.name] &&
          bodyData[config.name].find((ele) => ele === confElement.name)
        ) {
          confElement.status = "checked";
        }
        if (confCount > 0) {
          configsCount.push(confElement);
        }
      }
      configsFilter.push({
        name: config.name,
        values: configsCount,
        type: "checkbox",
      });
      configsCount = [];
    }

    return configsFilter;
  } catch (error) {
    throw error;
  }
};

export const filterOptions = async (bodyData, stockFilter) => {
  try {
    const filter = {};
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
    return filter;
  } catch (err) {
    throw err;
  }
};

export const fetchFilteredProducts = (filter, page) => {
  return Product.find(filter)
    .skip((page - 1) * productsPerPage)
    .limit(productsPerPage);
};

export const prepareBodyData = (arr) => {
  const newData = arr.map((ele) => {
    return { name: ele };
  });
  return newData;
};

export const prepareResData = (target, res) => {
  let targetElement;
  let resData = res;
  if (!target) {
    return res;
  }
  if (target) {
    targetElement = res.find((ele) => ele.name === target);
  }
  // console.log(targetElement);
  const hasChecked = targetElement.values.find(
    (ele) => ele.status === "checked"
  );
  // console.log(hasChecked);
  if (hasChecked) {
    resData = res.filter((op) => {
      return target && op.name !== target;
    });
  }

  return resData;
};

export const productsTotal = (filter) => {
  return Product.countDocuments(filter);
};

export const prepareReqData = (queryParams) => {
  let reqData = {};
  for (let prop in queryParams) {
    if (typeof queryParams[prop] === "string") {
      reqData[prop] = [queryParams[prop]];
    } else {
      reqData[prop] = [...queryParams[prop]];
    }
  }

  if (!reqData.page) {
    reqData.page = [1];
  }

  return reqData;
};
