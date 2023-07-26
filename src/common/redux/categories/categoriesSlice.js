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
    },
    newInternalCategory: (state, action) => {
      const { savedCategory } = action.payload
      state.categories = [...state.categories, savedCategory]
    }
  }
})

export const { getCategories, clearCategories, newInternalCategory } = categoriesSlice.actions

export default categoriesSlice.reducer

export const selectCurrentCategories = state => state.categories.categories
