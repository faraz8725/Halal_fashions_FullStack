/* import express from "express";
import Product from "../models/Product.js";
import multer from "multer";

const router = express.Router();

// storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ CREATE PRODUCT
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price, stock, sizes, category } = req.body;

    const product = await Product.create({
      name,
      price,
      stock,
      sizes: sizes.split(","), // "S,M,L"
      category,
      image: req.file.filename,
    });

    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;  */


import express from "express";
import Product from "../models/Product.js";
import multer from "multer";

const router = express.Router();

// storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ CREATE PRODUCT
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price, stock, sizes, category } = req.body;

    const product = await Product.create({
      name,
      price,
      stock,
      sizes: sizes.split(","),
      category,
      image: req.file.filename,
    });

    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ GET ALL PRODUCTS (🔥 yeh missing tha)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ UPDATE PRODUCT
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, stock, sizes, category } = req.body;

    const updateData = {
      name,
      price,
      stock,
      sizes: sizes.split(","),
      category,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;