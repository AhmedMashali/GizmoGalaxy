import Category from "../../models/category.js";

export const getCategories = () => {
  return Category.find();
};

export const createCategory = (name, configurations) => {
  const category = new Category({ name, configurations });
  return category.save();
};

export const getConfigurations = (categoryName) => {
  return Category.findOne({ name: categoryName }).select("configurations -_id");
};
