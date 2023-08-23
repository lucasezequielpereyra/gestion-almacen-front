import { useEffect } from 'react'
import { useGetEmployeesQuery } from '../redux/employees/employeesApiSlice'
import { getEmployees, selectCurrentEmployees } from '../redux/employees/employeesSlice'
import { useDispatch, useSelector } from 'react-redux'

export const useUpdateEmployees = () => {
  const employees = useSelector(selectCurrentEmployees)
  const dispatch = useDispatch()
  const { data: data, isSuccess } = useGetEmployeesQuery()

  useEffect(() => {
    if (isSuccess && employees?.length === 0) {
      dispatch(getEmployees(data))
    }
  }, [data])
}
