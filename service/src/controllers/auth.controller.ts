import { NextFunction, Request, Response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import emailTransporter from "../config/email.js";

export const authRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userData = {
      firstName,
      lastName,
      email,
      password: hashPassword,
    };

    const insertedUser = await User.create(userData);
    const { password: _, ...userResponse } = insertedUser.toObject();
    res.status(201).json({
      success: true,
      message: "User registration successful",
      data: userResponse,
    });

  } catch (error) {
    next(error);
  }
};

export const authLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register."
      })
    }
    const comparePass = await bcrypt.compare(password, userExist?.password);
    if (!comparePass) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password"
      })
    }

    const token = jwt.sign(
      {
        userId: userExist._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({
      success: true,
      message: "Login successful", 
      token,

    })
  } catch (error) {
    next(error)
  }
}


export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Current user fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const changeAuthPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;

    const { currentPassword, newPassword } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userExist = await User.findById(userId);

    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const comparePassword = await bcrypt.compare(
      currentPassword,
      userExist.password
    );

    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect current password",
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    userExist.password = newHashedPassword;

    await userExist.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const forgotAuthPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    userExist.resetPasswordToken = hashedResetToken;

    userExist.resetPasswordExpires = new Date(
      Date.now() + 15 * 60 * 1000
    );

    await userExist.save();

   const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

await emailTransporter.sendMail({
  from: process.env.EMAIL_USER,
  to: userExist.email,
  subject: "Reset Your Password",
  html: `
    <h2>Password Reset Request</h2>

    <p>Hello ${userExist.firstName},</p>

    <p>
      We received a request to reset your password.
    </p>

    <p>
      Click the button below to reset your password.
    </p>

    <a
      href="${resetUrl}"
      style="
        display: inline-block;
        padding: 12px 20px;
        background-color: #000;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
      "
    >
      Reset Password
    </a>

    <p>
      This link will expire in 15 minutes.
    </p>

    <p>
      If you did not request a password reset, you can safely ignore this email.
    </p>
  `,
});

    return res.status(200).json({
      success: true,
      message: "Password reset instructions sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const resetAuthPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, newPassword } = req.body;

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const userExist = await User.findOne({
      resetPasswordToken: hashedResetToken,
      resetPasswordExpires: {
        $gt: new Date(),
      },
    });

    if (!userExist) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    const newHashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    userExist.password = newHashedPassword;

    // Invalidate the reset token
    userExist.resetPasswordToken = null;
    userExist.resetPasswordExpires = null;

    await userExist.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};