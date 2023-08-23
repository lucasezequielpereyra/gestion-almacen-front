import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentEmployees } from '../../common/redux/employees/employeesSlice'
import Content from './components/content'
import SubHeader from '../../common/components/subHeader'
import { useUpdateEmployees } from '../../common/hooks/useUpdateEmployees'

const Owner = () => {
  useUpdateEmployees()
  const reduxEmployees = useSelector(selectCurrentEmployees)

  const [employees, setEmployees] = useState([])

  useEffect(() => {
    setEmployees(reduxEmployees)
  }, [reduxEmployees])

  return (
    <div>
      <SubHeader title="Administración de Empleados" />
      <Content employees={employees} />
    </div>
  )
}

export default Owner
