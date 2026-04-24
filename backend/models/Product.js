import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  images: [String],
  category: String, // ladies / kids
  stock: Number,
});

export default mongoose.model("Product", schema);