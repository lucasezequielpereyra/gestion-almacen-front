import { useRef } from 'react'
import { usePressEscKey } from '../../hooks/usePressEscKey'
import { useClickOutside } from '../../hooks/useClickOutside'
import Modal from '../modal/modal'
import propTypes from 'prop-types'
import styles from './inactiveProducts.module.scss'
import InactiveProductsTable from './inactiveProductsTable/inactiveProductsTable'

const InactiveProducts = ({ handleShow, show, setShow }) => {
  const modalRef = useRef(null)

  usePressEscKey(() => handleShow(show, setShow))
  useClickOutside(modalRef, () => handleShow(show, setShow))

  return (
    <Modal
      handleModal={() => handleShow(show, setShow)}
      active={show}
      modalTitle={'Productos Inactivos'}
      modalRef={modalRef}
      className={styles.container}
    >
      <InactiveProductsTable />
    </Modal>
  )
}

export default InactiveProducts

InactiveProducts.propTypes = {
  handleShow: propTypes.func.isRequired,
  show: propTypes.bool.isRequired,
  setShow: propTypes.func.isRequired
}
