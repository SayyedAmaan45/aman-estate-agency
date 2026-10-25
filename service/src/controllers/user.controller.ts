import { NextFunction, Request, Response } from "express";
import User from "../models/user.model.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      message: "User list fetched successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getSpecificUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const userData = await User.findById(id).select("-password");

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSpecificUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const { firstName, lastName, email, isActive } = req.body;

    const updatedUserDetails = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        isActive,
      },
      {
returnDocument: 'after',
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUserDetails) {
      return res.status(404).json({
        success: false,
        message: "User does not exist or might have been deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "User details updated successfully",
      data: updatedUserDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSpecificUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ids } = req.body;

    if (!ids) {
      return res.status(400).json({
        success: false,
        message: "Please provide user IDs or 'all'",
      });
    }

    let deleteResult;

    if (ids === "all") {
      deleteResult = await User.deleteMany({});
    } else if (Array.isArray(ids)) {
      deleteResult = await User.deleteMany({
        _id: { $in: ids },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "ids must be an array or 'all'",
      });
    }

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found to delete",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users deleted successfully",
      data: deleteResult,
    });
  } catch (error) {
    next(error);
  }
};

