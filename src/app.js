import express from "express";

import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 3000;

const app = express();

await connectDB();
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
