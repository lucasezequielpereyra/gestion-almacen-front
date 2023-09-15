import { apiSlice } from '../api/apiSlice'

const salesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    newSale: builder.mutation({
      query: sale => ({
        url: '/api/sale',
        method: 'POST',
        body: { ...sale }
      })
    })
  })
})

export const { useNewSaleMutation } = salesApiSlice
