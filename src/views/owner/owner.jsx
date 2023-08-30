import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCurrentEmployees,
  selectCurrentRoles,
  newInternalEmployee,
  updateInternalEmployee,
  deleteInternalEmployee
} from '../../common/redux/employees/employeesSlice'
import {
  useNewEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation
} from '../../common/redux/employees/employeesApiSlice'
import {
  useUpdateEmployees,
  useUpdateInactiveEmployees
} from '../../common/hooks/useUpdateEmployees'
import Content from './components/content'
import SubHeader from '../../common/components/subHeader'
import Form from '../../common/components/form'
import FormItems from './components/formItems/formItems'
import InactiveEmployees from './inactiveEmployees'
import NewEmployee from './newEmployee'

const Owner = () => {
  useUpdateEmployees()
  useUpdateInactiveEmployees()

  const reduxEmployees = useSelector(selectCurrentEmployees)
  const reduxRoles = useSelector(selectCurrentRoles)

  const dispatch = useDispatch()

  // states
  const [employees, setEmployees] = useState([])
  const [roles, setRoles] = useState([])
  const [employeeRoles, setEmployeeRoles] = useState([])
  const [loading, setLoading] = useState({
    newEmployee: false,
    updateEmployee: false,
    deleteEmployee: false
  })
  const [modalNewEmployee, setModalNewEmployee] = useState(false)
  const [msgError, setMsgError] = useState('')
  const [formValues, setFormValues] = useState({})
  const [formRoles, setFormRoles] = useState([])
  const [modalUpdateEmployee, setModalUpdateEmployee] = useState(false)
  const [modalInactiveEmployees, setModalInactiveEmployees] = useState(false)

  useEffect(() => {
    setEmployees(reduxEmployees)
    setRoles(reduxRoles)
  }, [reduxEmployees, reduxRoles])

  // redux actions
  const [
    updateEmployee,
    { error: updateEmployeeError, status: updateEmployeeStatus, data: updateEmployeeData }
  ] = useUpdateEmployeeMutation()

  const [
    deleteEmployee,
    { error: deleteEmployeeError, status: deleteEmployeeStatus, data: deletedEmployee }
  ] = useDeleteEmployeeMutation()

  useEffect(() => {
    if (updateEmployeeStatus === 'pending') {
      setLoading(loading => ({ ...loading, updateEmployee: true }))
    }
    if (updateEmployeeStatus === 'rejected') {
      setMsgError(updateEmployeeError.data?.error)
      setLoading(loading => ({ ...loading, updateEmployee: false }))
    }
    if (updateEmployeeStatus === 'fulfilled') {
      dispatch(updateInternalEmployee(updateEmployeeData))
      setLoading(loading => ({ ...loading, updateEmployee: false }))
      handleShowUpdateEmployee()
    }
  }, [updateEmployeeStatus])

  useEffect(() => {
    if (deleteEmployeeStatus === 'pending') {
      setLoading(loading => ({ ...loading, deleteEmployee: true }))
    }
    if (deleteEmployeeStatus === 'rejected') {
      setMsgError(deleteEmployeeError.data?.error)
      setLoading(loading => ({ ...loading, deleteEmployee: false }))
    }
    if (deleteEmployeeStatus === 'fulfilled') {
      dispatch(deleteInternalEmployee(deletedEmployee))
      setLoading(loading => ({ ...loading, deleteEmployee: false }))
    }
  }, [deleteEmployeeStatus])

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

  const handleShowNewEmployee = (setValues, setRoles, setError) => {
    if (modalNewEmployee) {
      setValues({})
      setRoles([])
      setError('')
    }
    setModalNewEmployee(!modalNewEmployee)
  }

  const handleShowUpdateEmployee = employee => {
    if (modalUpdateEmployee) {
      setFormValues({})
      setFormRoles([])
      setMsgError('')
    }
    if (!modalUpdateEmployee) {
      const { username, email } = employee
      setFormValues({ username, email, _id: employee._id })
      setFormRoles(employee.roles.map(role => role.name))

      // recovered roles from employee
      const parseToSelect = employee.roles.map(role => ({ value: role._id, label: role.name }))
      setEmployeeRoles(parseToSelect)
    }
    setModalUpdateEmployee(!modalUpdateEmployee)
  }

  const handleModalInactiveEmployees = () => {
    setModalInactiveEmployees(!modalInactiveEmployees)
  }

  const handleDeleteEmployee = employee => {
    try {
      deleteEmployee(employee._id)
    } catch (error) {
      console.log(error)
    }
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

  const handleSubmitUpdate = e => {
    e.preventDefault()
    try {
      updateEmployee({
        employeeId: formValues._id,
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
      <Content
        employees={employees}
        handleShowNewEmployee={handleShowNewEmployee}
        handleShowUpdateEmployee={handleShowUpdateEmployee}
        handleDeleteEmployee={handleDeleteEmployee}
        handleModalInactiveEmployees={handleModalInactiveEmployees}
        loading={loading.deleteEmployee}
      />
      {modalNewEmployee && (
        <NewEmployee active={modalNewEmployee} handleModal={handleShowNewEmployee} />
      )}
      {modalUpdateEmployee && (
        <Form
          active={modalUpdateEmployee}
          handleModal={handleShowUpdateEmployee}
          handleSubmit={handleSubmitUpdate}
          msgError={msgError}
          modalTitle="Editar Empleado"
        >
          <FormItems
            formValues={formValues}
            employeeRoles={employeeRoles}
            handleChange={handleChange}
            buttonLabel="Editar Usuario"
            loading={loading.updateEmployee}
            availableRoles={roles}
          />
        </Form>
      )}
      {modalInactiveEmployees && (
        <InactiveEmployees
          handleModal={handleModalInactiveEmployees}
          active={modalInactiveEmployees}
        />
      )}
    </>
  )
}

export default Owner
