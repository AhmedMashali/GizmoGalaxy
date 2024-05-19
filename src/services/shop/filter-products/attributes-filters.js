import Product from "../../../models/product.js";
import Category from "../../../models/category.js";

export const brandsFilter = async (brands, filter, checkedItems) => {
  let brandsf = { ...filter };
  let updatedBrands = [];
  if (brandsf["brands.name"]) {
    delete brandsf["brands.name"];
  }

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

export const categoriesFilter = async (categories, filter, checkedItems) => {
  let categoriesf = { ...filter };
  let updatedcategories = [];
  if (categoriesf["category.name"]) {
    delete categoriesf["category.name"];
  }

  try {
    for (let category of categories) {
      const countCategory = await Product.countDocuments({
        "category.name": category.name,
        ...categoriesf,
      });
      if (countCategory > 0) {
        category = { name: category.name, count: countCategory };

        if (checkedItems && checkedItems.find((ele) => ele === category.name)) {
          category.status = "checked";
        }
        updatedcategories.push(category);
      }
    }
    return { name: "categories", type: "checkbox", values: updatedcategories };
  } catch (err) {
    throw err;
  }
};
