import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

import reviewRoutes from "./routes/review.js";



import productRoutes from "./routes/product.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);


app.use("/api/product", productRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/review", reviewRoutes);



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);