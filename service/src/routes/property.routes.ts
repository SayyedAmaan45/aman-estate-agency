import express from "express";

import { validate } from "../middleware/validation.middleware.js";
import { createPropertySchema, deletePropertiesSchema, getPropertiesSchema, propertyIdSchema, updatePropertySchema } from "../utils/validations/property.validation.js";
import { createProperty, deleteProperties, deleteSpecificProperty, getAllProperties, getPropertyBySlug, getSpecificProperty, updateSpecificProperty } from "../controllers/property.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { validatePropertyImages } from "../middleware/validatePropertyImages.middleware.js";

const router = express.Router();

router.post(
  "/properties", authMiddleware, adminMiddleware,upload.array("images", 10),
    validatePropertyImages,
 validate(createPropertySchema, "body"), createProperty);

router.get("/properties", validate(getPropertiesSchema, "query"), getAllProperties)
router.get("/slug/:slug", getPropertyBySlug);
router.get("/properties/:id",validate(propertyIdSchema, "params"), getSpecificProperty);
router.patch("/properties/:id", authMiddleware, adminMiddleware,  upload.array("images", 10),
validate(propertyIdSchema, "params"), validate(updatePropertySchema, "body"), updateSpecificProperty);
router.delete("/properties/:id", authMiddleware, adminMiddleware, validate(propertyIdSchema, "params"), deleteSpecificProperty);
router.delete("/properties", authMiddleware, adminMiddleware, validate(deletePropertiesSchema, "body"), deleteProperties);
export default router;