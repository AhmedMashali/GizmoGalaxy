import express from "express";
import bodyParser from "body-parser";

import { connectDB } from "./config/db.js";

import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";

import { get404, get505 } from "./controllers/errors.js";
import { get } from "mongoose";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.static("src/public"));
app.use("/products/categories/src/images", express.static("src/images"));
app.use("/products/brands/src/images", express.static("src/images"));

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
