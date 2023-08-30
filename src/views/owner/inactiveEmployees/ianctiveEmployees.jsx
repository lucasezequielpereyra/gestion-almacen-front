import Modal from '../../../common/components/modal'
import propTypes from 'prop-types'
import { usePressEscKey } from '../../../common/hooks/usePressEscKey'
import { useClickOutside } from '../../../common/hooks/useClickOutside'
import { useRef } from 'react'
import InactiveTable from '../components/inactiveTable/'

const InactiveEmployees = ({
  activeModal,
  handleModal,
  employees,
  handleActiveEmployee,
  loading
}) => {
  const ref = useRef(null)

  usePressEscKey(handleModal)
  useClickOutside(ref, handleModal)

  return (
    <Modal
      active={activeModal}
      size={'lg'}
      modalTitle="Empleados Inactivos"
      handleModal={handleModal}
      modalRef={ref}
    >
      <InactiveTable
        employees={employees}
        handleActiveEmployee={handleActiveEmployee}
        loading={loading}
      />
    </Modal>
  )
}

export default InactiveEmployees

InactiveEmployees.propTypes = {
  activeModal: propTypes.bool.isRequired,
  handleModal: propTypes.func.isRequired,
  employees: propTypes.array,
  handleActiveEmployee: propTypes.func.isRequired,
  loading: propTypes.bool
}

InactiveEmployees.defaultProps = {
  employees: [],
  loading: false
}
