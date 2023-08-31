import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCurrentEmployees,
  deleteInternalEmployee
} from '../../common/redux/employees/employeesSlice'
import { useDeleteEmployeeMutation } from '../../common/redux/employees/employeesApiSlice'
import {
  useUpdateEmployees,
  useUpdateInactiveEmployees
} from '../../common/hooks/useUpdateEmployees'
import Content from './components/content'
import SubHeader from '../../common/components/subHeader'
import InactiveEmployees from './inactiveEmployees'
import NewEmployee from './newEmployee'
import UpdateEmployee from './updateEmployee/'

const Owner = () => {
  useUpdateEmployees()
  useUpdateInactiveEmployees()

  const reduxEmployees = useSelector(selectCurrentEmployees)

  const dispatch = useDispatch()

  // states
  const [employees, setEmployees] = useState([])
  const [employeeRoles, setEmployeeRoles] = useState([])
  const [loading, setLoading] = useState({
    deleteEmployee: false
  })
  const [modalNewEmployee, setModalNewEmployee] = useState(false)
  const [formValues, setFormValues] = useState({})
  const [formRoles, setFormRoles] = useState([])
  const [modalUpdateEmployee, setModalUpdateEmployee] = useState(false)
  const [modalInactiveEmployees, setModalInactiveEmployees] = useState(false)

  // save employees in local state
  useEffect(() => {
    setEmployees(reduxEmployees)
  }, [reduxEmployees])

  // redux actions
  const [
    deleteEmployee,
    { error: deleteEmployeeError, status: deleteEmployeeStatus, data: deletedEmployee }
  ] = useDeleteEmployeeMutation()

  // effect to update local state when redux state changes
  useEffect(() => {
    if (deleteEmployeeStatus === 'pending') {
      setLoading(loading => ({ ...loading, deleteEmployee: true }))
    }
    if (deleteEmployeeStatus === 'rejected') {
      setLoading(loading => ({ ...loading, deleteEmployee: false }))
    }
    if (deleteEmployeeStatus === 'fulfilled') {
      dispatch(deleteInternalEmployee(deletedEmployee))
      setLoading(loading => ({ ...loading, deleteEmployee: false }))
    }
  }, [deleteEmployeeStatus])

  // method for controlled form in update employee
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

  // method for show modal new employee
  const handleShowNewEmployee = (setValues, setRoles, setError) => {
    if (modalNewEmployee) {
      setValues({})
      setRoles([])
      setError('')
    }
    setModalNewEmployee(!modalNewEmployee)
  }

  // method for show modal update employee
  const handleShowUpdateEmployee = employee => {
    if (modalUpdateEmployee) {
      setFormValues({})
      setFormRoles([])
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

  // method for show modal inactive employees
  const handleModalInactiveEmployees = () => {
    setModalInactiveEmployees(!modalInactiveEmployees)
  }

  // method for delete employee
  const handleDeleteEmployee = employee => {
    try {
      deleteEmployee(employee._id)
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
        <UpdateEmployee
          active={modalUpdateEmployee}
          handleModal={handleShowUpdateEmployee}
          formValues={formValues}
          formRoles={formRoles}
          employeeRoles={employeeRoles}
          handleChange={handleChange}
        />
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
