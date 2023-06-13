import { useRef } from 'react'
import Modal from '../modal'
import propTypes from 'prop-types'
import { usePressEscKey } from '../../hooks/usePressEscKey'
import { useClickOutside } from '../../hooks/useClickOutside'

const CategoryForm = ({ handleModal, modalTitle, active }) => {
  const modalRef = useRef(null)
  usePressEscKey(handleModal)
  useClickOutside(modalRef, handleModal)

  return (
    <Modal handleModal={handleModal} active={active} modalTitle={modalTitle} modalRef={modalRef}>
      Soy un form
    </Modal>
  )
}

export default CategoryForm

CategoryForm.propTypes = {
  handleModal: propTypes.func.isRequired,
  modalTitle: propTypes.string.isRequired,
  active: propTypes.bool.isRequired
}
