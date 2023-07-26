import { useEffect } from 'react'
import { useGetProductsQuery } from '../redux/products/productsApiSlice'
import { getProducts, selectCurrentProducts } from '../redux/products/productsSlice'
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
