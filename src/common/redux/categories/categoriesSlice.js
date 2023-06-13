import { createSlice } from '@reduxjs/toolkit'

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: { categories: [] },
  reducers: {
    getCategories: (state, action) => {
      const { categories } = action.payload
      state.categories = categories
    },
    clearCategories: state => {
      state.categories = []
    }
  }
})

export const { getCategories, clearCategories } = categoriesSlice.actions

export default categoriesSlice.reducer

export const selectCurrentCategories = state => state.categories.categories
