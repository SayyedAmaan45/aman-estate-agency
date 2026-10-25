import { Request, Response, NextFunction } from "express";
import Property from "../models/property.model.js";
import fs from "fs/promises";
import path from "path";
import createSlug from "../utils/createSlug.js";

type PropertyType =
  | "house"
  | "apartment"
  | "office"
  | "land"
  | "shop"
  | "warehouse"
  | "villa"
  | "commercial"
  | "plot";

type ListingType = "rent" | "sale";
type SortBy = "price" | "area" | "createdAt";
type OrderType = "asc" | "desc";
type FurnishingType =
  | "unfurnished"
  | "semi-furnished"
  | "fully-furnished";

export const createProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files as Express.Multer.File[];

  try {
    const {
      title,
      description,
      propertyType,
      listingType,
      price,
      bhk,
      bathrooms,
      area,
      city,
      locality,
      address,
      furnishing,
      amenities,
      status,
    } = req.body;

    const images = files.map(
      (file) => `/uploads/${file.filename}`
    );

const baseSlug = createSlug(title);
let slug = baseSlug;
let suffix = 1;

while (await Property.exists({ slug })) {
  slug = `${baseSlug}-${suffix}`;
  suffix++;
}

    const propertyData = {
      title,
      slug,
      description,
      propertyType,
      listingType,
      price,
      bhk,
      bathrooms,
      area,
      city,
      locality,
      address,
      furnishing,
      amenities,
      status,
      images,
    };

    const insertedData = await Property.create(propertyData);

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: insertedData,
    });
  } catch (error) {
    // Delete uploaded files if property creation fails
    for (const file of files) {
      try {
        await fs.unlink(file.path);
      } catch (deleteError) {
        console.error(
          "Failed to delete uploaded file:",
          deleteError
        );
      }
    }

    next(error);
  }
};
export const getAllProperties = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      propertyType,
      listingType,
      minPrice,
      maxPrice,
      bhk,
      furnishing,
      city,
      locality,
      page,
      limit,
      sortBy,
      order,
    } = req.query;
    const filter: Record<string, any> = {};
    // const filter: {
    //   propertyType?: PropertyType;
    //   listingType?: ListingType;
    //   price?: {
    //     $gte?: number;
    //     $lte?: number;
    //   };

    // } = {};

    if (propertyType) {
      filter.propertyType = propertyType as PropertyType;
    }

    if (listingType) {
      filter.listingType = listingType as ListingType;
    }

    if (bhk) {
      const bhkValue = Number(bhk);

      filter.bhk =
        bhkValue >= 5
          ? { $gte: 5 }
          : bhkValue;
    }

    if (furnishing) {
      filter.furnishing = furnishing as FurnishingType;
    }

    if (city && locality && String(city) === String(locality)) {
    const searchRegex = {
        $regex: String(city),
        $options: "i",
    };

    filter.$or = [
        { city: searchRegex },
        { locality: searchRegex },
    ];
} else {
    if (city) {
        filter.city = {
            $regex: String(city),
            $options: "i",
        };
    }

    if (locality) {
        filter.locality = {
            $regex: String(locality),
            $options: "i",
        };
    }
}

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;
    const sortField: SortBy = (sortBy as SortBy) || "createdAt";

    const sortOrder: 1 | -1 =
      order === "desc" ? -1 : 1;



    
const [propertyData, totalProperties] = await Promise.all([
  Property.find(filter)
    .sort({ [sortField]: sortOrder })
    .skip(skip)
    .limit(limitNumber),

  Property.countDocuments(filter),
]);

const totalPages = Math.ceil(totalProperties / limitNumber);

    res.status(200).json({
      success: true,
      message: "Properties fetched successfully",
      data: propertyData,
      pagination: {
    totalProperties,
    currentPage: pageNumber,
    totalPages,
    limit: limitNumber,
  },
    });
  } catch (error) {
    next(error);
  }
};

export const getSpecificProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const specificProperty = await Property.findById(id);

    if (!specificProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property fetched successfully",
      data: specificProperty,
    });
  } catch (error) {
    next(error);
  }
};

export const getPropertyBySlug=async(
  req:Request,
  res:Response,
  next:NextFunction
)=>{
  try{
    const {slug}=req.params;

    const property=await Property.findOne({slug});

    if(!property){
      return res.status(404).json({
        success:false,
        message:"Property not found"
      })
    }

    res.status(200).json({
      success:true,
      message:"Property fetched successfully",
      data:property
    })

  }catch(error){
    next(error)
  }

}
export const updateSpecificProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files as Express.Multer.File[];

  try {
    const { id } = req.params;


    // Find existing property
    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const {
      keepImages,
      ...propertyUpdates
    } = req.body;

    // Existing images stored in MongoDB
    const oldImages = existingProperty.images || [];

    // Convert keepImages into an array
    const hasKeepImages = keepImages !== undefined;
    const hasNewImages = files.length > 0;

    let imagesToKeep: string[];

    if (hasKeepImages) {
      imagesToKeep = Array.isArray(keepImages)
        ? keepImages
        : [keepImages];
    } else if (!hasNewImages) {
      imagesToKeep = oldImages;
    } else {
      imagesToKeep = oldImages;
    }

    const imagesToDelete = hasKeepImages
      ? oldImages.filter(
        (image) => !imagesToKeep.includes(image)
      )
      : [];

    const newImages = files.map(
      (file) => `/uploads/${file.filename}`
    );

    const finalImages = [
      ...imagesToKeep,
      ...newImages,
    ];
    // Update property
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      {
        ...propertyUpdates,
        images: finalImages,
      },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    );

    if (!updatedProperty) {
      // MongoDB update failed → delete newly uploaded files
      for (const file of files) {
        try {
          await fs.unlink(file.path);
        } catch (deleteError) {
          console.error(
            "Failed to delete uploaded file:",
            deleteError
          );
        }
      }

      return res.status(404).json({
        success: false,
        message: "Property does not exist or might have been deleted",
      });
    }

    // Delete old images removed from the property
    for (const image of imagesToDelete) {
      if (image.startsWith("/uploads/")) {
        const filename = path.basename(image);
        const filePath = path.resolve("uploads", filename);

        try {
          await fs.unlink(filePath);
        } catch (deleteError) {
          console.error(
            "Failed to delete old image:",
            deleteError
          );
        }
      }
    }

    res.status(200).json({
      success: true,
      message: "Property details updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    // MongoDB failed → remove newly uploaded images
    for (const file of files) {
      try {
        await fs.unlink(file.path);
      } catch (deleteError) {
        console.error(
          "Failed to delete uploaded file:",
          deleteError
        );
      }
    }

    next(error);
  }
};

export const deleteSpecificProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Find property first
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Get existing images
    const images = property.images || [];

    // Delete property from MongoDB
    await Property.findByIdAndDelete(id);

    // Delete local images
    for (const image of images) {
      if (image.startsWith("/uploads/")) {
        const filename = path.basename(image);
        const filePath = path.resolve("uploads", filename);

        try {
          await fs.unlink(filePath);
        } catch (deleteError) {
          console.error(
            "Failed to delete property image:",
            deleteError
          );
        }
      }
    }

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteProperties = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ids } = req.body;

    if (!ids) {
      return res.status(400).json({
        success: false,
        message: "Please provide property ids or 'all'",
      });
    }

    let deleteResult;

    if (ids === "all") {
      deleteResult = await Property.deleteMany({});
    } else if (Array.isArray(ids)) {
      deleteResult = await Property.deleteMany({
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
        message: "No properties found to delete",
      });
    }

    res.status(200).json({
      success: true,
      message: "Properties deleted successfully",
      data: deleteResult,
    });
  } catch (error) {
    next(error);
  }
};