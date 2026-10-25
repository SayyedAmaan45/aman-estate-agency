import Joi from "joi";



export const userIdSchema=Joi.object({
      id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid user ID",
    }),
})

export const updateUserSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .optional(),

  lastName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .optional(),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .optional(),

  isActive: Joi.boolean().optional(),
});

export const deleteUsersSchema = Joi.object({
  ids: Joi.alternatives()
    .try(
      Joi.string().valid("all"),

      Joi.array()
        .items(
          Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
        )
        .min(1)
    )
    .required(),
});