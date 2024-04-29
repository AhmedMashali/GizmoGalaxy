import express from "express";
import bodyParser from "body-parser";

import { connectDB } from "./config/db.js";

import adminRoutes from "./admin/routes/admin.js";

import { get404, get505 } from "./admin/controllers/errors.js";
import { get } from "mongoose";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "src/admin/views");

app.use(express.static("src/admin/public"));

app.use("/admin", adminRoutes);
app.use(get404);
app.use(get505);

try {
  await connectDB();
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
} catch (err) {
  console.log(err);
}
