import express from "express";

import { connectDB } from "./config/db.js";

import adminRoutes from "./routes/admin.js";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.static("src/public"));

app.use("/admin", adminRoutes);

try {
  await connectDB();
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
} catch (err) {
  console.log(err);
}
