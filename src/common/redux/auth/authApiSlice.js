import { apiSlice } from '../api/apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    logoutSession: builder.mutation({
      query: () => ({
        url: '/auth/login',
        method: 'GET'
      })
    })
  })
})

export const { useLoginMutation } = authApiSlice
export const { useLogoutSessionMutation } = authApiSlice
