import { Schema, model } from "mongoose";

const PropertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

  slug: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true,
},

    description: {
      type: String,
      required: true,
      trim: true,
    },

    propertyType: {
      type: String,
      required: true,
      enum: {
        values: [
          "house",
          "apartment",
          "office",
          "land",
          "shop",
          "warehouse",
          "villa",
          "commercial",
          "plot",
        ],
        message: "{VALUE} is not a valid property type",
      },
      lowercase: true,
      trim: true,
    },

    listingType: {
      type: String,
      required: true,
      enum: {
        values: ["rent", "sale"],
        message: "{VALUE} is not a valid listing type",
      },
      lowercase: true,
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0.01, "Price must be a positive number greater than zero"],
    },

    bhk: {
      type: Number,
      min: [1, "BHK must be at least 1"],
    },

    bathrooms: {
      type: Number,
      min: [1, "Bathrooms must be at least 1"],
    },

    area: {
      type: Number,
      required: [true, "Area is required"],
      min: [1, "Area must be greater than zero"],
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    locality: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    furnishing: {
      type: String,
      required: true,
      enum: {
        values: ["unfurnished", "semi-furnished", "fully-furnished"],
        message: "{VALUE} is not a valid furnishing type",
      },
      lowercase: true,
      trim: true,
    },

    amenities: {
      type: [String],
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: {
        values: ["available", "sold", "rented", "under-negotiation"],
        message: "{VALUE} is not a valid property status",
      },
      lowercase: true,
      trim: true,
    },

    images: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Property = model("Property", PropertySchema);

export default Property;