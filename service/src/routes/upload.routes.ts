import express from "express";

import { uploadImage } from "../controllers/upload.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post(
  "/upload",
  upload.single("image"),
  uploadImage
);

router.post(
  "/upload-multiple",
  upload.array("images", 10),
  uploadImage
);

export default router;