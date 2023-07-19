import { apiSlice } from '../api/apiSlice'

const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => '/api/category'
    })
  })
})

const newCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    newCategory: builder.mutation({
      query: category => ({
        url: '/api/category',
        method: 'POST',
        body: { ...category }
      })
    })
  })
})

export const { useGetCategoriesQuery } = categoriesApiSlice
export const { useNewCategoryMutation } = newCategoryApiSlice
