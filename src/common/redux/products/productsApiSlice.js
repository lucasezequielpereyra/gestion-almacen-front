import { apiSlice } from '../api/apiSlice'

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => '/api/product'
    })
  })
})

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => '/api/category'
    })
  })
})

export const newProductsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    newProduct: builder.mutation({
      query: product => ({
        url: '/api/product',
        method: 'POST',
        body: { ...product }
      })
    })
  })
})

export const { useGetProductsQuery } = productsApiSlice
export const { useGetCategoriesQuery } = categoriesApiSlice
export const { useNewProductMutation } = newProductsApiSlice
