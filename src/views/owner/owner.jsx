import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCurrentEmployees,
  selectCurrentRoles,
  newInternalEmployee
} from '../../common/redux/employees/employeesSlice'
import { useNewEmployeeMutation } from '../../common/redux/employees/employeesApiSlice'
import { useUpdateEmployees } from '../../common/hooks/useUpdateEmployees'
import Content from './components/content'
import SubHeader from '../../common/components/subHeader'
import Form from '../../common/components/form'
import FormItems from './components/formItems/formItems'

const Owner = () => {
  useUpdateEmployees()
  const reduxEmployees = useSelector(selectCurrentEmployees)
  const reduxRoles = useSelector(selectCurrentRoles)

  const dispatch = useDispatch()

  // states
  const [employees, setEmployees] = useState([])
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalNewEmployee, setModalNewEmployee] = useState(false)
  const [msgError, setMsgError] = useState('')
  const [formValues, setFormValues] = useState({})
  const [formRoles, setFormRoles] = useState([])

  useEffect(() => {
    setEmployees(reduxEmployees)
    setRoles(reduxRoles)
  }, [reduxEmployees, reduxRoles])

  // redux actions
  const [
    newEmployee,
    { error: newEmployeeError, status: newEmployeeStatus, data: newEmployeeData }
  ] = useNewEmployeeMutation()

  useEffect(() => {
    if (newEmployeeStatus === 'pending') {
      setLoading(true)
    }
    if (newEmployeeStatus === 'rejected') {
      setMsgError(newEmployeeError.data?.error)
      setLoading(false)
    }
    if (newEmployeeStatus === 'fulfilled') {
      dispatch(newInternalEmployee(newEmployeeData))
      setLoading(false)
      handleShowNewEmployee()
    }
  }, [newEmployeeStatus])

  const handleChange = (e, selected) => {
    if (selected) {
      const { option, removedValue } = selected
      if (option) {
        return setFormRoles([...formRoles, option.label])
      }
      if (removedValue) {
        const newRoles = formRoles.filter(role => role !== removedValue.label)
        return setFormRoles(newRoles)
      }
    }
    const {
      target: { name, value }
    } = e
    setFormValues({ ...formValues, [name]: value })
  }

  const handleShowNewEmployee = () => {
    if (modalNewEmployee) {
      setFormValues({})
      setFormRoles([])
      setMsgError('')
    }
    setModalNewEmployee(!modalNewEmployee)
  }

  const handleSubmit = e => {
    e.preventDefault()
    try {
      newEmployee({
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
        roles: formRoles
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <SubHeader title="Administración de Empleados" />
      <Content employees={employees} handleShowNewEmployee={handleShowNewEmployee} />
      {modalNewEmployee && (
        <Form
          active={modalNewEmployee}
          handleModal={handleShowNewEmployee}
          handleSubmit={handleSubmit}
          msgError={msgError}
          modalTitle="Nuevo Empleado"
        >
          <FormItems
            formValues={formValues}
            handleChange={handleChange}
            buttonLabel="Agregar Usuario"
            loading={loading}
            availableRoles={roles}
          />
        </Form>
      )}
    </>
  )
}

export default Owner
