import { createSlice } from "@reduxjs/toolkit";
import { api } from "../app/api";

const homeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHome: builder.query({
      query: () => "/",
    }),
  }),
  overrideExisting: false,
});

const homeSlice = createSlice({
  name: "main",
  initialState: {},
  reducers: {},
});

export default homeSlice.reducer;

export const { useGetHomeQuery, } = homeApi;