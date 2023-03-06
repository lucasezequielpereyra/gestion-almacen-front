import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, roles: null, organization: null },
  reducers: {
    login: (state, action) => {
      const { username, accessToken, roles, organization } = action.payload
      state.user = username
      state.token = accessToken
      state.roles = roles
      state.organization = organization
    },
    logout: state => {
      state.user = null
      state.token = null
      state.roles = null
      state.organization = null
    }
  }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = state => state.auth.user
export const selectCurrentToken = state => state.auth.token
export const selectCurrentRoles = state => state.auth.roles
export const selectCurrentOrganization = state => state.auth.organization
