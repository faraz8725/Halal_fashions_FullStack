import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: String,
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Review", reviewSchema);