import Joi from "joi";

export const registerUserSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required(),

  lastName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required(),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .max(16)
    .required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(8).max(16).required(),
})


export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .min(8)
    .max(16)
    .required(),

  newPassword: Joi.string()
    .min(8)
    .max(16)
    .required(),
}).custom((value, helpers) => {
  if (value.currentPassword === value.newPassword) {
    return helpers.error("any.invalid");
  }

  return value;
}).messages({
  "any.invalid": "New password must be different from current password",
});


export const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),
});


export const resetPasswordSchema = Joi.object({
  token: Joi.string()
    .required(),

  newPassword: Joi.string()
    .min(8)
    .max(16)
    .required(),
});