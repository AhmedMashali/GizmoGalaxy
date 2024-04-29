import { createCategory, getConfigurations } from "../services/categories.js";

export const getAddCategory = (req, res, next) => {
  return res.render("admin/add-category", {
    pageTitle: "Add Category",
  });
};

export const postCategories = async (req, res, next) => {
  const { name, configurations } = req.body;
  // Validate inputs
  // Check if category exists!
  try {
    await createCategory(name, configurations);
    return res.redirect("/admin");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getCategoryConfigurations = async (req, res, next) => {
  const { categoryName } = req.params;
  try {
    const configs = await getConfigurations(categoryName);
    if (!configs) {
      return res.status(404).json({ msg: "category does not exist" });
    }
    res.status(200).json({
      configurations: configs.configurations,
    });
  } catch (err) {
    console.log(err);
  }
};
