import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

const locationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLocations: builder.query({
      query: () => "/locations",
    }),
    getLocationById: builder.query({
      query: (id) => `/locations/${id}`,
    }),
    addToLocation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/locations/${id}`,
        method: "POST",
        body: data,
        responseHandler: (response) => response.text(),
      }),
      invalidateTags: ["Locations"],
    }),
    createLocation: builder.mutation({
      query: (data) => ({
        url: `/locations`,
        method: "POST",
        body: data,
        responseHandler: (response) => response.text(),
      }),
      invalidateTags: ["Locations"],
    }),
  }),
  overrideExisting: false,
});

const locationsSlice = createSlice({
  name: "locations",
  initialState: {},
  reducers: {},
});

export default locationsSlice.reducer;

export const {
  useGetLocationsQuery,
  useGetLocationByIdQuery,
  useAddToLocationMutation,
  useCreateLocationMutation,
  useGetStockQuery,
} = locationsApi;
