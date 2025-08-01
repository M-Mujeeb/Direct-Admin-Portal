import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store/store"; 

import {
  LoginRequest,
  LoginResponse,
  GetCustomersResponse,
} from "@/types/api.types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      // Skip token for login
      if (endpoint === "login") return headers;

      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
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

    // Add other authenticated endpoints here
  }),
});

export const { useLoginMutation, useGetAllCustomersQuery } = authApi;
