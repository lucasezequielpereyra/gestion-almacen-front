import { useEffect, useState } from 'react'
import {
  selectCurrentRoles,
  newInternalEmployee
} from '../../../common/redux/employees/employeesSlice'
import { useNewEmployeeMutation } from '../../../common/redux/employees/employeesApiSlice'
import { useSelector, useDispatch } from 'react-redux'
import propTypes from 'prop-types'
import Form from '../../../common/components/form/'
import FormItems from '../components/formItems/formItems'

const NewEmployee = ({ active, handleModal }) => {
  const reduxRoles = useSelector(selectCurrentRoles)

  const dispatch = useDispatch()

  // states
  const [roles, setRoles] = useState([])
  const [formValues, setFormValues] = useState({})
  const [formRoles, setFormRoles] = useState([])
  const [msgError, setMsgError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setRoles(reduxRoles)
  }, [reduxRoles])

  // redux action
  const [
    newEmployee,
    { error: newEmployeeError, status: newEmployeeStatus, data: newEmployeeData }
  ] = useNewEmployeeMutation()

  // effect to update local state when redux state changes
  useEffect(() => {
    if (newEmployeeStatus === 'pending') {
      setLoading(true)
    }
    if (newEmployeeStatus === 'rejected') {
      setMsgError(newEmployeeError.data?.message)
      console.log(newEmployeeError)
      setLoading(false)
    }
    if (newEmployeeStatus === 'fulfilled') {
      dispatch(newInternalEmployee(newEmployeeData))
      setLoading(false)
      handleModal(setFormValues, setFormRoles, setMsgError)
    }
  }, [newEmployeeStatus])

  // method for controlled form
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

  // method for submit form
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
    <Form
      active={active}
      handleModal={() => handleModal(setFormValues, setFormRoles, setMsgError)}
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
  )
}

export default NewEmployee

NewEmployee.propTypes = {
  handleModal: propTypes.func.isRequired,
  active: propTypes.bool
}

NewEmployee.defaultProps = {
  active: false
}
