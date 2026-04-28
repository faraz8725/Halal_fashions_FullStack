import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// ✅ ADD REVIEW
router.post("/add", async (req, res) => {
  try {
    const { name, text } = req.body;

    const review = await Review.create({ name, text });
    res.json(review);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ GET ALL REVIEWS
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;