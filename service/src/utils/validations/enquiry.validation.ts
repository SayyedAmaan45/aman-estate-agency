
import Joi from "joi";

export const createEnquirySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  email: Joi.string()
    .trim()
    .email()
    .max(254)
    .required(),

  phone: Joi.string()
    .trim()
    .pattern(/^[0-9+\-()\s]{7,20}$/)
    .allow("")
    .optional(),

  enquiryType: Joi.string()
    .valid("buy", "rent", "sell", "invest", "other")
    .required(),

  budget: Joi.string()
    .trim()
    .max(100)
    .allow("")
    .optional(),

  preferredLocation: Joi.string()
    .trim()
    .max(150)
    .allow("")
    .optional(),

  message: Joi.string()
    .trim()
    .min(10)
    .max(2000)
    .required(),
}).unknown(false);
