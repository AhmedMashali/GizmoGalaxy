import Category from "../../models/category.js";

export const getCategories = () => {
  return Category.find();
};

export const getCategory = async (name, filter = "") => {
  try {
    const category = await Category.findOne({ name: name }).select(filter);
    return category;
  } catch (err) {
    throw err;
  }
};

export const createCategory = (name, configurations) => {
  const category = new Category({ name, configurations });
  return category.save();
};

export const getConfigurations = (categoryName) => {
  return Category.findOne({ name: categoryName }).select("configurations -_id");
};
