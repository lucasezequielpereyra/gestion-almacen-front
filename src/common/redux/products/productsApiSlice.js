import { apiSlice } from '../api/apiSlice'

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => '/api/product'
    })
  })
})

const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => '/api/category'
    })
  })
})

const newProductsApiSlice = apiSlice.injectEndpoints({
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

const updateProductApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    updateProduct: builder.mutation({
      query: product => ({
        url: `/api/product/${product.id}`,
        method: 'PUT',
        body: { ...product }
      })
    })
  })
})

export const { useGetProductsQuery } = productsApiSlice
export const { useGetCategoriesQuery } = categoriesApiSlice
export const { useNewProductMutation } = newProductsApiSlice
export const { useUpdateProductMutation } = updateProductApiSlice
