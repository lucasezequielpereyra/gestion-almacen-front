import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { login, logout } from '../auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.originalStatus === 403) {
    console.log('sending refresh token')

    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
    console.log(refreshResult)

    if (refreshResult?.data) {
      const user = api.getState().auth.user
      // store the new token
      api.dispatch(login({ ...refreshResult.data, user }))
      // retry the original request
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
})
