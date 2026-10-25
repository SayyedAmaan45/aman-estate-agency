
import mongoose from "mongoose";
import dotenv from "dotenv";
import Property from "../models/property.model.js";
import createSlug from "../utils/createSlug.js";

dotenv.config();



const migratePropertySlugs = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("Mongo URI is not defined");
    }

    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");

    const properties = await Property.find({
      $or: [
        { slug: { $exists: false } },
        { slug: "" },
        { slug: null },
      ],
    }).select("_id title");

    const usedSlugs = new Set<string>();

    const existingProperties = await Property.find({
      slug: { $exists: true, $nin: ["", null] },
    }).select("slug");

    existingProperties.forEach((property) => {
      if (property.slug) {
        usedSlugs.add(property.slug);
      }
    });

    for (const property of properties) {
      const baseSlug = createSlug(property.title) || "property";
      let slug = baseSlug;
      let suffix = 1;

      while (usedSlugs.has(slug)) {
        slug = `${baseSlug}-${suffix}`;
        suffix++;
      }

      await Property.updateOne(
        { _id: property._id },
        { $set: { slug } }
      );

      usedSlugs.add(slug);
      console.log(`Migrated: ${property.title} -> ${slug}`);
    }

    console.log(`Migration complete. Updated ${properties.length} properties.`);
  } catch (error) {
    console.error("Property slug migration failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

migratePropertySlugs();
