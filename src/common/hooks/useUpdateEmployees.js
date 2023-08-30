import { useEffect } from 'react'
import {
  useGetEmployeesQuery,
  useGetInactiveEmployeesQuery
} from '../redux/employees/employeesApiSlice'
import {
  getEmployees,
  selectCurrentEmployees,
  getInactiveEmployees,
  selectInactiveEmployees
} from '../redux/employees/employeesSlice'
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

export const useUpdateInactiveEmployees = () => {
  const inactiveEmployees = useSelector(selectInactiveEmployees)
  const dispatch = useDispatch()
  const { data: data, isSuccess } = useGetInactiveEmployeesQuery()

  useEffect(() => {
    if (isSuccess && inactiveEmployees?.length === 0) {
      dispatch(getInactiveEmployees(data))
    }
  }, [data])
}
