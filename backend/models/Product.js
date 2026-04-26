import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  stock: Number,
  sizes: [String],
  category: String, // "ladies" | "kids"
  image: String,
});

export default mongoose.model("Product", productSchema);