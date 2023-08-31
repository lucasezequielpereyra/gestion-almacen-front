import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateInternalEmployee,
  selectCurrentRoles
} from '../../../common/redux/employees/employeesSlice'
import { useUpdateEmployeeMutation } from '../../../common/redux/employees/employeesApiSlice'
import propTypes from 'prop-types'
import Form from '../../../common/components/form/'
import FormItems from '../components/formItems/formItems'

const UpdateEmployee = ({
  active,
  handleModal,
  formValues,
  employeeRoles,
  handleChange,
  formRoles
}) => {
  const dispatch = useDispatch()

  const reduxRoles = useSelector(selectCurrentRoles)

  // states
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(false)
  const [msgError, setMsgError] = useState('')

  // save roles in local state
  useEffect(() => {
    setRoles(reduxRoles)
  }, [reduxRoles])

  // redux action
  const [
    updateEmployee,
    { error: updateEmployeeError, status: updateEmployeeStatus, data: updateEmployeeData }
  ] = useUpdateEmployeeMutation()

  // effect to
  useEffect(() => {
    if (updateEmployeeStatus === 'pending') {
      setLoading(true)
    }
    if (updateEmployeeStatus === 'rejected') {
      setMsgError(updateEmployeeError.data?.error)
      setLoading(false)
    }
    if (updateEmployeeStatus === 'fulfilled') {
      dispatch(updateInternalEmployee(updateEmployeeData))
      setLoading(false)
      handleModal()
    }
  }, [updateEmployeeStatus])

  // method for submit form

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
    <Form
      active={active}
      handleModal={handleModal}
      handleSubmit={handleSubmitUpdate}
      msgError={msgError}
      modalTitle="Editar Empleado"
    >
      <FormItems
        formValues={formValues}
        employeeRoles={employeeRoles}
        handleChange={handleChange}
        buttonLabel="Editar Usuario"
        loading={loading}
        availableRoles={roles}
      />
    </Form>
  )
}

export default UpdateEmployee

UpdateEmployee.propTypes = {
  active: propTypes.bool.isRequired,
  handleModal: propTypes.func.isRequired,
  formValues: propTypes.object.isRequired,
  employeeRoles: propTypes.array.isRequired,
  handleChange: propTypes.func.isRequired,
  formRoles: propTypes.array.isRequired
}
