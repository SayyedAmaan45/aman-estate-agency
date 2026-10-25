import { NextFunction, Request, Response } from "express";
import Enquiry from "../models/enquiry.model.js";

export const createEnquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      email,
      phone,
      enquiryType,
      budget,
      preferredLocation,
      message,
    } = req.body;

    const enquiryData = {
      name,
      email,
      phone,
      enquiryType,
      budget,
      preferredLocation,
      message,
    };

    const insertedEnquiry = await Enquiry.create(enquiryData);

    res.status(201).json({
      success: true,
      message: "Enquiry sent successfully",
      data: {
        id: insertedEnquiry._id,
        name: insertedEnquiry.name,
        enquiryType: insertedEnquiry.enquiryType,
        status: insertedEnquiry.status,
        createdAt: insertedEnquiry.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
