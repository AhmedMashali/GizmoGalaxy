import { createProduct } from "../services/admin.js";
import { getCategories } from "../services/categories.js";
import { getBrands } from "../services/brands.js";

export const getIndex = (req, res, next) => {
  return res.render("admin/index", {
    pageTitle: "GizmoGalaxy",
  });
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

export const postAddProduct = async (req, res, next) => {
  try {
    await createProduct(req.body, req.files);
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
  }
};
