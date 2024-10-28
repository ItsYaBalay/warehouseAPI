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
    addLocation: builder.mutation({
      query: (data) => ({
        url: "/locations",
        method: "POST",
        body: data,
        responseHandler: (response) => response.text(),
      }),
      invalidateTags: ["Products"],
    }),
    newStock: builder.mutation({
      query: ({ id, data }) => ({
        url: `/locations/${id}`,
        method: "POST",
        body: data,
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["Locations"],
    }),
    getStockByProductId: builder.query({
      query: (id) => `/stock/${id}`,
    }),
    updateStock: builder.mutation({
      query: (id, amount) => ({
        url: `/locations/${id}`,
        method: "PUT",
        body: {
          masterAmount: amount,
          innerAmount: 12,
          unitAmount: 72,
        },
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["Locations", "Products"],
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
  useNewStockMutation,
  useUpdateStockMutation,
  useGetStockByProductIdQuery,
} = productsApi;
