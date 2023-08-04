import { apiSlice } from '../api/apiSlice'

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => '/api/product'
    })
  })
})

const inactiveProductsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getInactiveProducts: builder.query({
      query: () => '/api/product/inactive'
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

const deleteProductApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    deleteProduct: builder.mutation({
      query: id => ({
        url: `/api/product/${id}`,
        method: 'DELETE'
      })
    })
  })
})

const activeProductApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    activeProduct: builder.mutation({
      query: id => ({
        url: `/api/product/inactive/${id}`,
        method: 'PUT'
      })
    })
  })
})

export const { useGetProductsQuery } = productsApiSlice
export const { useGetInactiveProductsQuery } = inactiveProductsApiSlice
export const { useNewProductMutation } = newProductsApiSlice
export const { useUpdateProductMutation } = updateProductApiSlice
export const { useDeleteProductMutation } = deleteProductApiSlice
export const { useActiveProductMutation } = activeProductApiSlice
