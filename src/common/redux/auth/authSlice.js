import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
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
