import { useEffect } from 'react'
import { useGetCategoriesQuery } from '../redux/categories/categoriesApiSlice'
import { getCategories } from '../redux/categories/categoriesSlice'
import { useDispatch } from 'react-redux'

export const useUpdateCategories = () => {
  const dispatch = useDispatch()
  const { data: data, isSuccess } = useGetCategoriesQuery()

  useEffect(() => {
    if (isSuccess) {
      dispatch(getCategories(data))
    }
  }, [data])
}
