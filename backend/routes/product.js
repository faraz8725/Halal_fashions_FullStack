
/*

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

export default router;  */

/*
import express from "express";
import Product from "../models/Product.js";
import multer from "multer";
 //import { ImageKitStorage } from "multer-storage-imagekit";
import imagekit from "../utils/imagekit.js";

const router = express.Router();

// ✅ ImageKit storage
//const storage = new ImageKitStorage({
  //imagekit: imagekit,
  //folder: "products",
// });

//const upload = multer({ storage });



//import multer from "multer";

const storage = multer.memoryStorage(); // 🔥 change
const upload = multer({ storage });

/* ================== CREATE ================== *
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price, stock, sizes, category } = req.body;

    const product = await Product.create({
      name,
      price,
      stock,
      sizes: sizes ? sizes.split(",") : [],
      category,
      image: req.file ? req.file.path : "",
      fileId: req.file ? req.file.fileId : "", // 🔥 important for delete
    });

    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================== GET ALL ================== *
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================== GET ONE ================== *
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================== UPDATE ================== *
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, stock, sizes, category } = req.body;

    const existing = await Product.findById(req.params.id);

    const updateData = {
      name,
      price,
      stock,
      sizes: sizes ? sizes.split(",") : [],
      category,
    };

    // 🔥 agar new image aayi to old delete karo
    if (req.file) {
      if (existing?.fileId) {
        await imagekit.deleteFile(existing.fileId);
      }

      updateData.image = req.file.path;
      updateData.fileId = req.file.fileId;
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

/* ================== DELETE ================== *
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // 🔥 ImageKit se bhi delete
    if (product?.fileId) {
      await imagekit.deleteFile(product.fileId);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router; */



import express from "express";
import Product from "../models/Product.js";
import multer from "multer";
import imagekit from "../utils/imagekit.js";

const router = express.Router();

// ✅ memory storage (buffer ke liye)
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* ================== CREATE ================== */
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price, stock, sizes, category } = req.body;

    let imageUrl = "";
    let fileId = "";

    // 🔥 upload to ImageKit
    if (req.file) {
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: "products",
      });

      imageUrl = result.url;
      fileId = result.fileId;
    }

    const product = await Product.create({
      name,
      price,
      stock,
      sizes: sizes ? sizes.split(",") : [],
      category,
      image: imageUrl,
      fileId: fileId,
    });

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/* ================== GET ALL ================== */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================== GET ONE ================== */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================== UPDATE ================== */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, stock, sizes, category } = req.body;

    const existing = await Product.findById(req.params.id);

    const updateData = {
      name,
      price,
      stock,
      sizes: sizes ? sizes.split(",") : [],
      category,
    };

    // 🔥 agar new image aayi to old delete + new upload
    if (req.file) {
      if (existing?.fileId) {
        await imagekit.deleteFile(existing.fileId);
      }

      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: "products",
      });

      updateData.image = result.url;
      updateData.fileId = result.fileId;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/* ================== DELETE ================== */
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // 🔥 ImageKit se delete
    if (product?.fileId) {
      await imagekit.deleteFile(product.fileId);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;