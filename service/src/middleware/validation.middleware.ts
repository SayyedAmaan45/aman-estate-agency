import { NextFunction, Request, Response } from "express";
import Joi from "joi";

type ValidationSource = "body" | "query" | "params";

export const validate = (
  schema: Joi.ObjectSchema,
  source: ValidationSource
) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    if (source === "body") {
      req.body = value;
    }

    next();
  };
};