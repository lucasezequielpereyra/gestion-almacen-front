import { createSlice } from '@reduxjs/toolkit'

const salesSlice = createSlice({
  name: 'sales',
  initialState: { sales: [] },
  reducers: {
    getSales: (state, action) => {
      const { foundSales } = action.payload
      state.sales = foundSales
    },
    newInternalSale: (state, action) => {
      const { newSale } = action.payload
      state.sales = [...state.sales, newSale]
    }
  }
})

export const { getSales, newInternalSale } = salesSlice.actions

export default salesSlice.reducer

export const selectCurrentSales = state => state.sales.sales
