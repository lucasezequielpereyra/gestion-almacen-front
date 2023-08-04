import { useEffect } from 'react'
import {
  useGetProductsQuery,
  useGetInactiveProductsQuery
} from '../redux/products/productsApiSlice'
import {
  getProducts,
  selectCurrentProducts,
  getInactiveProducts,
  selectCurrentInactiveProducts
} from '../redux/products/productsSlice'
import { useDispatch, useSelector } from 'react-redux'

export const useUpdateProducts = () => {
  const products = useSelector(selectCurrentProducts)
  const dispatch = useDispatch()
  const { data: data, isSuccess } = useGetProductsQuery()

  useEffect(() => {
    if (isSuccess && products.length === 0) {
      dispatch(getProducts(data))
    }
  }, [data])
}

export const useUpdateInactiveProducts = () => {
  const inactiveProducts = useSelector(selectCurrentInactiveProducts)
  const dispatch = useDispatch()
  const { data: data, isSuccess } = useGetInactiveProductsQuery()

  useEffect(() => {
    if (isSuccess && inactiveProducts.length === 0) {
      dispatch(getInactiveProducts(data))
    }
  }, [data])
}
