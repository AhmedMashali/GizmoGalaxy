import Brand from "../../models/brand.js";

export const getBrands = () => {
  return Brand.find().select("name -_id");
};
