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
    },
    updateInternalProduct: (state, action) => {
      const { updatedProduct } = action.payload
      state.products = state.products.map(product => {
        if (product._id === updatedProduct._id) {
          return updatedProduct
        }
        return product
      })
    },
    deleteInternalProduct: (state, action) => {
      const { deletedProduct } = action.payload
      state.products = state.products.filter(product => product._id !== deletedProduct._id)
    }
  }
})

export const {
  getProducts,
  clearProducts,
  newInternalProduct,
  deleteInternalProduct,
  updateInternalProduct
} = productsSlice.actions

export default productsSlice.reducer

export const selectCurrentProducts = state => state.products.products
