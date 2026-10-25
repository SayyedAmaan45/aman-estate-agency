export type PropertyType =
  | "house"
  | "apartment"
  | "office"
  | "land"
  | "shop"
  | "warehouse"
  | "villa"
  | "commercial"
  | "plot";

export type ListingType = "rent" | "sale";

export type FurnishingType =
  | "unfurnished"
  | "semi-furnished"
  | "fully-furnished";

export type PropertyStatus =
  | "available"
  | "sold"
  | "rented"
  | "under-negotiation";

export interface Property {
  _id: string;
  title: string;
  slug: string;
  description: string;
  propertyType: PropertyType;
  listingType: ListingType;
  price: number;
  bhk?: number;
  bathrooms?: number;
  area: number;
  city: string;
  locality: string;
  address: string;
  furnishing: FurnishingType;
  amenities: string[];
  status: PropertyStatus;
  images: string[];
  createdAt: string;
  updatedAt: string;
}