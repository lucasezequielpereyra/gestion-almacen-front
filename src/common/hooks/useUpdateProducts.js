import { useEffect } from 'react'
import { useGetProductsQuery } from '../redux/products/productsApiSlice'
import { getProducts } from '../redux/products/productsSlice'
import { useDispatch } from 'react-redux'

export const useUpdateProducts = () => {
  const dispatch = useDispatch()
  const { data: data, isSuccess } = useGetProductsQuery()

  useEffect(() => {
    if (isSuccess) {
      dispatch(getProducts(data))
    }
  }, [data])
}
