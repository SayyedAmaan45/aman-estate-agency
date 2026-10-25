import { api } from "@/services/api/api";
import type { Property } from "./property.types";

interface PropertiesResponse {
  success: boolean;
  message: string;
  data: Property[];
  pagination: {
    totalProperties: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  }
}

interface PropertyResponse {
  success: boolean;
  message: string;
  data: Property;
}

interface PropertyFilters {
  listingType?: string;
  propertyType?: string;
  minPrice?: string;
  maxPrice?: string;
  city?: string;
  locality?: string;
  bhk?: string;
  furnishing?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
}

export const propertyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<
      PropertiesResponse,
      PropertyFilters
    >({
      query: (filters) => {
        const params = new URLSearchParams();

        if (filters.listingType) {
          params.set("listingType", filters.listingType);
        }

        if (filters.propertyType) {
          params.set("propertyType", filters.propertyType);
        }

        if (filters.minPrice) {
          params.set("minPrice", filters.minPrice);
        }

        if (filters.maxPrice) {
          params.set("maxPrice", filters.maxPrice);
        }

        if (filters.city) {
          params.set("city", filters.city);
        }
        if (filters.locality) {
          params.set("locality", filters.locality);
        }

        if (filters.bhk) {
          params.set("bhk", filters.bhk);
        }

        if (filters.furnishing) {
          params.set("furnishing", filters.furnishing);
        }

        if (filters.page !== undefined) {
          params.set("page", String(filters.page))
        }
        if (filters.limit !== undefined) {
          params.set("limit", String(filters.limit))
        }
        if (filters.sortBy) params.set("sortBy", filters.sortBy);
        if (filters.order) params.set("order", filters.order);

        return `/properties?${params.toString()}`;
      },
    }),
    getPropertyBySlug: builder.query<PropertyResponse, string>({
      query: (slug) => `/slug/${encodeURIComponent(slug)}`,
    }),
  }),

});

export const { useGetPropertiesQuery,useGetPropertyBySlugQuery } = propertyApi;
