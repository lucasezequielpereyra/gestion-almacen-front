import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import authReducer from './auth/authSlice'
import productsReducer from './products/productsSlice'
import categoriesReducer from './categories/categoriesSlice'
import employeesReducer from './employees/employeesSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    products: productsReducer,
    categories: categoriesReducer,
    employees: employeesReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production'
})
