import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store/store";

import {
  LoginRequest,
  LoginResponse,
  GetCustomersResponse,
  GetCelebritiesResponse,
  CreateCelebrityResponse,
  DeleteCelebrityResponse,
  UpdateCelebrityResponse
} from "@/types/api.types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (endpoint === "login") return headers;

      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Celebrities"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/v1/admin/login",
        method: "POST",
        body: credentials,
      }),
    }),

    getAllCustomers: builder.query<GetCustomersResponse, void>({
      query: () => ({
        url: "/v1/admin/customers",
        method: "GET",
      }),
    }),

    getAllCelebrities: builder.query<GetCelebritiesResponse, void>({
      query: () => ({
        url: "/v1/admin/celebrities",
        method: "GET",
      }),
      providesTags: ["Celebrities"],
    }),

    createCelebrity: builder.mutation<CreateCelebrityResponse, FormData>({
      query: (formData) => ({
        url: "/v1/admin/celebrity",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Celebrities"],
    }),

    deleteCelebrity: builder.mutation<DeleteCelebrityResponse, string>({
      query: (id) => ({
        url: `/v1/admin/celebrity/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Celebrities"],
    }),

    updateCelebrity: builder.mutation<UpdateCelebrityResponse, {id: string, formData: FormData}>({
      query: ({id, formData}) => ({
        url: `/v1/admin/celebrity/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Celebrities"],
    }),

    // Add other authenticated endpoints here
  }),
});

export const { useLoginMutation, useGetAllCustomersQuery, useGetAllCelebritiesQuery, useCreateCelebrityMutation, useDeleteCelebrityMutation, useUpdateCelebrityMutation } =
  authApi;
