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
    },
    newInternalProduct: (state, action) => {
      const { savedProduct } = action.payload
      state.products = [...state.products, savedProduct]
    }
  }
})

export const { getProducts, clearProducts, newInternalProduct } = productsSlice.actions

export default productsSlice.reducer

export const selectCurrentProducts = state => state.products.products
