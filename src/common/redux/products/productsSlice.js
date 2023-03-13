import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'products',
  initialState: { products: [] },
  reducers: {
    getProducts: (state, action) => {
      const { foundProducts } = action.payload
      state.products = foundProducts
    },
    clearProducts: state => {
      state.products = []
    }
  }
})

export const { getProducts, clearProducts } = productsSlice.actions

export default productsSlice.reducer

export const selectCurrentProducts = state => state.products.products
