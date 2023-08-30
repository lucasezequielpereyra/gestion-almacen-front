import Modal from '../../../common/components/modal'
import propTypes from 'prop-types'
import { usePressEscKey } from '../../../common/hooks/usePressEscKey'
import { useClickOutside } from '../../../common/hooks/useClickOutside'
import { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectInactiveEmployees,
  activeEmployees
} from '../../../common/redux/employees/employeesSlice'
import { useActiveEmployeeMutation } from '../../../common/redux/employees/employeesApiSlice'
import InactiveTable from '../components/inactiveTable/'

const InactiveEmployees = ({ handleModal, active }) => {
  const ref = useRef(null)
  usePressEscKey(handleModal)
  useClickOutside(ref, handleModal)

  const dispatch = useDispatch()

  // get redux state
  const reduxInactive = useSelector(selectInactiveEmployees)

  // states
  const [inactiveEmployees, setInactiveEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [msgError, setMsgError] = useState('')

  // set redux state to local state
  useEffect(() => {
    setInactiveEmployees(reduxInactive)
  }, [reduxInactive])

  // mutation
  const [
    activeEmployee,
    { error: activedEmployeeError, status: activedEmployeeStatus, data: activedEmployeeData }
  ] = useActiveEmployeeMutation()

  // effect to update redux state
  useEffect(() => {
    if (activedEmployeeStatus === 'pending') {
      setLoading(true)
    }
    if (activedEmployeeStatus === 'rejected') {
      setMsgError(activedEmployeeError.data?.error)
      setLoading(false)
    }
    if (activedEmployeeStatus === 'fulfilled') {
      dispatch(activeEmployees({ data: activedEmployeeData }))
      setLoading(false)
    }
  }, [activedEmployeeStatus])

  const handleActiveEmployee = employee => {
    try {
      activeEmployee(employee._id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      active={active}
      size={'lg'}
      modalTitle="Empleados Inactivos"
      handleModal={handleModal}
      modalRef={ref}
    >
      <InactiveTable
        employees={inactiveEmployees}
        handleActiveEmployee={handleActiveEmployee}
        loading={loading}
        msgError={msgError}
      />
    </Modal>
  )
}

export default InactiveEmployees

InactiveEmployees.propTypes = {
  handleModal: propTypes.func.isRequired,
  active: propTypes.bool.isRequired
}
