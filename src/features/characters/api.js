import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "./consts";

const api = createApi({
  reducerPath: "character-api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Characters"],
  endpoints: (build) => ({
    searchCharacters: build.query({
      query: (params) => {
        const search = new URLSearchParams(params).toString();
        return `/?${search}`;
      },
      transformResponse: (response) => response?.results ?? [],
    }),
    getById: build.query({
      query: (id) => {
        return `/${id}`;
      },
    }),
    getManyById: build.query({
      query: (ids) => {
        const search = ids.toString();
        return `/${search}`;
      },
      transformResponse: (response) => response ?? [],
    }),
  }),
});

export const {
  useSearchCharactersQuery,
  useGetByIdQuery,
  useGetManyByIdQuery,
} = api;

export default api;
