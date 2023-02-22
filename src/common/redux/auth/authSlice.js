import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    login: (state, action) => {
      const { username, accessToken } = action.payload
      state.user = username
      state.token = accessToken
    },
    logout: state => {
      state.user = null
      state.token = null
    }
  }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = state => state.auth.user
export const selectCurrentToken = state => state.auth.token
