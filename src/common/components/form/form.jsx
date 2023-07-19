import { useRef } from 'react'
import styles from './form.module.scss'
import propTypes from 'prop-types'
import Modal from '../modal'
import { usePressEscKey } from '../../hooks/usePressEscKey'
import { useClickOutside } from '../../hooks/useClickOutside'

const Form = ({ active, handleModal, handleSubmit, msgError, children }) => {
  const modalRef = useRef(null)

  usePressEscKey(handleModal)
  useClickOutside(modalRef, handleModal)

  return (
    <Modal
      handleModal={handleModal}
      active={active}
      modalRef={modalRef}
      modalTitle="Agregar Producto"
    >
      <p className={styles.error}>{msgError}</p>
      <form className={styles.container} onSubmit={handleSubmit}>
        {children}
      </form>
    </Modal>
  )
}

export default Form

Form.propTypes = {
  active: propTypes.bool.isRequired,
  handleModal: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  msgError: propTypes.string.isRequired,
  children: propTypes.node.isRequired
}

Form.defaultProps = {
  active: false,
  handleModal: () => {}
}
