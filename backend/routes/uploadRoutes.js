import express from "express";
import multer from "multer";
import fs from "fs";
import imagekit from "../config/imagekit.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", protect, adminOnly, upload.single("image"), async (req, res) => {
  const file = fs.readFileSync(req.file.path);

  const result = await imagekit.upload({
    file,
    fileName: req.file.originalname,
  });

  fs.unlinkSync(req.file.path);

  res.json({ url: result.url });
});

export default router;