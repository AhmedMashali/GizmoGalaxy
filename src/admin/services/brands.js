import Brand from "../../models/brand.js";

export const getBrands = () => {
  return Brand.find();
};

export const isBrandExist = (brandName) => {
  return Brand.findOne({ name: brandName });
};

export const createBrand = (name) => {
  const brand = new Brand({
    name: name,
  });
  return brand.save();
};
