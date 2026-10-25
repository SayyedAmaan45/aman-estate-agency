import { Request, Response } from "express";

export const uploadImage = (
  req: Request,
  res: Response
) => {

  res.status(200).json({
    success: true,
    message: "Image uploaded successfully",
    file: req.file,
  });
};