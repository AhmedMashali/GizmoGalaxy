import Category from "../../models/category.js";

export const getCategories = () => {
  return Category.find().select("name -_id");
};
