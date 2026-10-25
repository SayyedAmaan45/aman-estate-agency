import express from "express";
import { validate } from "../middleware/validation.middleware.js";
import {changePasswordSchema, forgotPasswordSchema, loginUserSchema, registerUserSchema, resetPasswordSchema } from "../utils/validations/auth.validation.js";
import { authLogin, authRegister, changeAuthPassword, forgotAuthPassword, getCurrentUser, resetAuthPassword } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/register", validate(registerUserSchema, "body"), authRegister);
router.post(
  "/login",
  validate(loginUserSchema, "body"),
  authLogin
);
router.post(
  "/change-password",
  authMiddleware,
  validate(changePasswordSchema, "body"),
  changeAuthPassword
);
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema, "body"),
  forgotAuthPassword
);
router.post(
  "/reset-password",
  validate(resetPasswordSchema, "body"),
  resetAuthPassword
);

router.get("/me", authMiddleware, getCurrentUser);

export default router;