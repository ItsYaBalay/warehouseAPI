import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
    }),
    getProductsById: builder.query({
      query: (id) => `/products/${id}`,
    }),
    addProducts: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
        responseHandler: (response) => response.text(),
      }),
      invalidateTags: ["Products"],
    }),
  }),
  overrideExisting: false,
});

const productsSlice = createSlice({
  name: "products",
  initialState: {},
  reducers: {},
});

export default productsSlice.reducer;

export const {
  useGetProductsQuery,
  useGetProductsByIdQuery,
  useAddProductsMutation,
} = productsApi;
