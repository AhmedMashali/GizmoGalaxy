import Brand from "../../models/brand.js";
import Category from "../../models/category.js";
import Product from "../../models/product.js";

export const createProduct = async (productData, imagesData) => {
  try {
    const category = await Category.findOne({
      name: productData.category,
    }).select("name");

    const brands = await Brand.find({
      name: { $in: productData.brands },
    }).select("name");

    const images = ImagesPaths(imagesData);

    // console.log(brands);

    const product = new Product({
      name: productData.name,
      title: productData.title,
      price: productData.price,
      images: images,
      stock: productData.stock,
      color: productData.color,
      brands: brands,
      category: category,
      configurations: productData.configurations,
      description: productData.description,
    });

    // console.log(product);
    return await product.save();
  } catch (err) {
    throw new Error(err);
  }
};

function ImagesPaths(images) {
  return images.map((img) => {
    return img.path;
  });
}
