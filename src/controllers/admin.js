import {
  createBrand,
  createCategory,
  getBrands,
  getCategories,
  getConfigurations,
  createProduct,
} from "../services/admin.js";

export const getIndex = (req, res, next) => {
  return res.render("admin/index", {
    pageTitle: "GizmoGalaxy",
  });
};

export const getAddBrand = (req, res, next) => {
  return res.render("admin/add-brand", {
    pageTitle: "Add Brand",
  });
};

export const postBrands = async (req, res, next) => {
  const { name } = req.body;
  try {
    await createBrand(name);
    return res.redirect("/admin");
  } catch (err) {
    console.log(err);
  }
};

export const getAddCategory = (req, res, next) => {
  return res.render("admin/add-category", {
    pageTitle: "Add Category",
  });
};

export const postCategories = async (req, res, next) => {
  const { name, configurations } = req.body;
  try {
    await createCategory(name, configurations);
    return res.redirect("/admin");
  } catch (err) {
    console.log(err);
  }
};

export const getAddProduct = async (req, res, next) => {
  try {
    const brands = await getBrands();
    const categories = await getCategories();
    return res.render("admin/add-product", {
      pageTitle: "Add Product",
      brands: brands,
      categories: categories,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getCategory = async (req, res, next) => {
  const { categoryName } = req.params;
  try {
    const configs = await getConfigurations(categoryName);
    res.status(200).json({
      configurations: configs.configurations,
    });
  } catch (err) {
    console.log(err);
  }
};

export const postAddProduct = async (req, res, next) => {
  try {
    await createProduct(req.body);
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
  }
};
