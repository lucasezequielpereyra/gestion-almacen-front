import { useEffect } from 'react'
import { useGetCategoriesQuery } from '../redux/categories/categoriesApiSlice'
import { getCategories, selectCurrentCategories } from '../redux/categories/categoriesSlice'
import { useDispatch, useSelector } from 'react-redux'

export const useUpdateCategories = () => {
  const categories = useSelector(selectCurrentCategories)
  const dispatch = useDispatch()
  const { data: data, isSuccess } = useGetCategoriesQuery()

  useEffect(() => {
    if (isSuccess && categories.length === 0) {
      dispatch(getCategories(data))
    }
  }, [data])
}
