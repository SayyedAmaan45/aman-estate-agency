import { NextFunction, Request, Response } from "express";

export const validatePropertyImages = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one property image is required",
    });
  }

  next();
};