import Brand from "../../models/brand.js";
import Category from "../../models/category.js";
import Product from "../../models/product.js";

import { ImagesPaths } from "../../helpers/admin.js";

export const validateConfig = (dbConfigurations, bodyData) => {
  let isConfigsCorrect = true;
  dbConfigurations.forEach((conf) => {
    if (!bodyData[`${conf}`]) {
      isConfigsCorrect = false;
      return;
    }
  });

  if (!isConfigsCorrect) {
    return false;
  }

  let configurations = {};
  dbConfigurations.forEach((conf) => {
    configurations[`${conf}`] = bodyData[`${conf}`];
  });
  return configurations;
};

export const createProduct = async (
  productData,
  imagesData,
  category,
  configurations
) => {
  try {
    const brands = await Brand.find({
      name: { $in: productData.brands },
    }).select("name");

    const images = ImagesPaths(imagesData);

    const product = new Product({
      name: productData.name,
      title: productData.title,
      price: productData.price,
      images: images,
      stock: productData.stock,
      color: productData.color,
      brands: brands,
      category: category,
      configurations: configurations,
      description: productData.description,
    });

    return await product.save();
  } catch (err) {
    throw new Error(err);
  }
};
