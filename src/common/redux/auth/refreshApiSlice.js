import { apiSlice } from '../api/apiSlice'

export const refreshApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getRefreshToken: builder.query({
      query: () => '/auth/refresh'
    })
  })
})

export const { useGetRefreshTokenQuery } = refreshApiSlice
