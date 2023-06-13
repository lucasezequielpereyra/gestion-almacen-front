import { apiSlice } from '../api/apiSlice'

const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => '/api/category'
    })
  })
})

export const { useGetCategoriesQuery } = categoriesApiSlice
