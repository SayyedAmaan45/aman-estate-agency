import Joi from "joi";

export const createPropertySchema = Joi.object({
  title: Joi.string().trim().required(),

  description: Joi.string().trim().required(),

  propertyType: Joi.string()
    .valid(
      "house",
      "apartment",
      "office",
      "land",
      "shop",
      "warehouse",
      "villa",
      "commercial",
      "plot"
    )
    .required(),

  listingType: Joi.string()
    .valid("rent", "sale")
    .required(),

  price: Joi.number().positive().required(),

  bhk: Joi.number().integer().min(1).optional(),

  bathrooms: Joi.number().integer().min(1).optional(),

  area: Joi.number().positive().required(),

  city: Joi.string().trim().required(),

  locality: Joi.string().trim().required(),

  address: Joi.string().trim().required(),

  furnishing: Joi.string()
    .valid("unfurnished", "semi-furnished", "fully-furnished")
    .required(),

  amenities: Joi.array()
    .items(Joi.string().trim())
    .min(1)
    .required(),

  status: Joi.string()
    .valid("available", "sold", "rented", "under-negotiation")
    .required(),

  images: Joi.array()
    .items(Joi.string().uri())
    .min(1)
    .optional(),
});


export const updatePropertySchema = Joi.object({
  title: Joi.string().trim().optional(),

  description: Joi.string().trim().optional(),

  propertyType: Joi.string()
    .valid(
      "house",
      "apartment",
      "office",
      "land",
      "shop",
      "warehouse",
      "villa",
      "commercial",
      "plot"
    )
    .optional(),

  listingType: Joi.string()
    .valid("rent", "sale")
    .optional(),

  price: Joi.number().positive().optional(),

  bhk: Joi.number().integer().min(1).optional(),

  bathrooms: Joi.number().integer().min(1).optional(),

  area: Joi.number().positive().optional(),

  city: Joi.string().trim().optional(),

  locality: Joi.string().trim().optional(),

  address: Joi.string().trim().optional(),

  furnishing: Joi.string()
    .valid("unfurnished", "semi-furnished", "fully-furnished")
    .optional(),

  amenities: Joi.array()
    .items(Joi.string().trim())
    .min(1)
    .optional(),

  status: Joi.string()
    .valid("available", "sold", "rented", "under-negotiation")
    .optional(),

  images: Joi.array()
    .items(Joi.string().uri())
    .min(1)
    .optional(),
});




export const getPropertiesSchema = Joi.object({
  propertyType: Joi.string()
    .valid(
      "house",
      "apartment",
      "office",
      "land",
      "shop",
      "warehouse",
      "villa",
      "commercial",
      "plot"
    )
    .optional(),

  listingType: Joi.string()
    .valid("rent", "sale")
    .optional(),

  minPrice: Joi.number().min(0).optional(),
  maxPrice: Joi.number().min(0).optional(),

  page: Joi.number().integer().positive().optional(),
  limit: Joi.number().integer().positive().optional(),

  sortBy: Joi.string()
    .valid("price", "area", "createdAt")
    .optional(),

  order: Joi.string()
    .valid("asc", "desc")
    .optional(),

  furnishing: Joi.string()
    .valid(
      "unfurnished",
      "semi-furnished",
      "fully-furnished"
    )
    .optional(),

  bhk: Joi.number().integer().min(1).optional(),

  city: Joi.string().trim().optional(),
  locality: Joi.string().trim().optional(),
}).custom(
  (value, helpers) => {
    if (
      value.minPrice !== undefined &&
      value.maxPrice !== undefined &&
      value.minPrice > value.maxPrice
    ) {
      return helpers.error("any.invalid");
    }

    return value;
  },
  "price range validation"
);

export const propertyIdSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
});

export const deletePropertiesSchema = Joi.object({
  ids: Joi.alternatives().try(
    Joi.string().valid("all"),
    Joi.array()
      .items(
        Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
      )
      .min(1)
  ).required(),
});