import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";
import { validate } from "../middleware/validation.middleware.js";

import {
  getAllUsers,
  getSpecificUser,
  updateSpecificUser,
  deleteSpecificUser,
  deleteUsers,
} from "../controllers/user.controller.js";

import {
  userIdSchema,
  updateUserSchema,
  deleteUsersSchema,
} from "../utils/validations/user.validation.js";

const router = express.Router();

// Get all users
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

// Get specific user
router.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  validate(userIdSchema, "params"),
  getSpecificUser
);

// Update specific user
router.patch(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  validate(userIdSchema, "params"),
  validate(updateUserSchema, "body"),
  updateSpecificUser
);

// Delete specific user
router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  validate(userIdSchema, "params"),
  deleteSpecificUser
);

// Bulk delete users
router.delete(
  "/users",
  authMiddleware,
  adminMiddleware,
  validate(deleteUsersSchema, "body"),
  deleteUsers
);

export default router;