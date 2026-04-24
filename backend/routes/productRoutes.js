import express from "express";
import Product from "../models/Product.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

router.post("/", protect, adminOnly, async (req, res) => {
  const p = await Product.create(req.body);
  res.json(p);
});

router.put("/:id", protect, adminOnly, async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

router.get("/count", protect, adminOnly, async (req, res) => {
  const count = await Product.countDocuments();
  res.json({ total: count });
});

export default router;