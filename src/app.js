import express from "express";
import bodyParser from "body-parser";

import { connectDB } from "./config/db.js";

import adminRoutes from "./admin/routes/admin.js";
import shopRoutes from "./shop/routes/shop.js";

import { get404, get505 } from "./admin/controllers/errors.js";
import { get } from "mongoose";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", ["src/admin/views", "views", "src/shop/views"]);

app.use(express.static("src/admin/public"));
app.use(express.static("src/shop/public"));
app.use(
  "/products/categories/src/admin/images",
  express.static("src/admin/images")
);
app.use(
  "/products/brands/src/admin/images",
  express.static("src/admin/images")
);

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(get404);
// app.use(get505);

try {
  await connectDB();
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
} catch (err) {
  console.log(err);
}
