import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    configurations: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Category", categorySchema);
