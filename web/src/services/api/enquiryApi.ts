import { api } from "./api";

export interface CreateEnquiryRequest {
  name: string;
  email: string;
  phone?: string;
  enquiryType: "buy" | "rent" | "sell" | "invest" | "other";
  budget?: string;
  preferredLocation?: string;
  message: string;
}

export interface CreateEnquiryResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    enquiryType: CreateEnquiryRequest["enquiryType"];
    status: "new" | "contacted" | "in-progress" | "closed";
    createdAt: string;
  };
}

export const enquiryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createEnquiry: builder.mutation<
      CreateEnquiryResponse,
      CreateEnquiryRequest
    >({
      query: (body) => ({
        url: "/enquiry",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateEnquiryMutation } = enquiryApi;
