import Brand from "../../models/brand.js";

export const getBrands = () => {
  return Brand.find();
};

export const isBrandExist = async (brandName) => {
  try {
    const brand = await Brand.findOne({ name: brandName });
    if (brand) {
      return true;
    }
    return false;
  } catch (err) {
    throw err;
  }
};

export const createBrand = (name) => {
  const brand = new Brand({
    name: name,
  });
  return brand.save();
};
