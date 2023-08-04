import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'products',
  initialState: { products: [], inactiveProducts: [] },
  reducers: {
    getProducts: (state, action) => {
      const { foundProducts } = action.payload
      state.products = foundProducts
    },
    clearProducts: state => {
      state.products = []
    },
    getInactiveProducts: (state, action) => {
      const { foundProducts } = action.payload
      state.inactiveProducts = foundProducts
    },
    clearInactiveProducts: state => {
      state.inactiveProducts = []
    },
    activeProducts: (state, action) => {
      const { activeProduct } = action.payload
      state.inactiveProducts = state.inactiveProducts.filter(
        product => product._id !== activeProduct._id
      )
      state.products = [...state.products, activeProduct]
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
      state.inactiveProducts = [...state.inactiveProducts, deletedProduct]
    }
  }
})

export const {
  getProducts,
  clearProducts,
  newInternalProduct,
  deleteInternalProduct,
  updateInternalProduct,
  getInactiveProducts,
  clearInactiveProducts,
  activeProducts
} = productsSlice.actions

export default productsSlice.reducer

export const selectCurrentProducts = state => state.products.products
export const selectCurrentInactiveProducts = state => state.products.inactiveProducts
