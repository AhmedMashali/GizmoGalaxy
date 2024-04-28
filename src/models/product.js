import { Schema, Types, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      // required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    brands: [
      {
        _id: {
          type: Types.ObjectId,
          ref: "Brand",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      _id: {
        type: Types.ObjectId,
        ref: "Category",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    configurations: [
      {
        type: Object,
      },
    ],
    description: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Product", productSchema);
