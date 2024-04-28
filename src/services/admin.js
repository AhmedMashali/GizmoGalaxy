import Brand from "../models/brand.js";
import Category from "../models/category.js";
import Product from "../models/product.js";

export const createBrand = async (name) => {
  const brand = new Brand({ name });
  try {
    return await brand.save();
  } catch (err) {
    throw new Error(err);
  }
};

export const createCategory = async (name, configurations) => {
  const category = new Category({ name, configurations });
  try {
    return await category.save();
  } catch (err) {
    throw new Error(err);
  }
};

export const getBrands = async () => {
  try {
    return await Brand.find();
  } catch (err) {
    throw new Error(err);
  }
};

export const getCategories = async () => {
  try {
    return await Category.find();
  } catch (err) {
    throw new Error(err);
  }
};

export const getConfigurations = async (categoryName) => {
  try {
    return await Category.findOne({ name: categoryName }).select(
      "configurations -_id"
    );
  } catch (err) {
    throw new Error(err);
  }
};

export const createProduct = async (productData) => {
  try {
    const category = await Category.findOne({
      name: productData.category,
    }).select("name");

    const brands = await Brand.find({
      name: { $in: productData.brands },
    }).select("name");

    console.log(brands);

    const product = new Product({
      name: productData.name,
      title: productData.title,
      price: productData.price,
      stock: productData.stock,
      color: productData.color,
      brands: brands,
      category: category,
      configurations: productData.configurations,
      description: productData.description,
    });

    console.log(product);
    return await product.save();
  } catch (err) {
    throw new Error(err);
  }
};
