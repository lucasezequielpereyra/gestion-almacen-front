import { useRef, useState, useEffect } from 'react'
import { usePressEscKey } from '../../../../common/hooks/usePressEscKey'
import { useClickOutside } from '../../../../common/hooks/useClickOutside'
import styles from './inactiveProducts.module.scss'
import Modal from '../../../../common/components/modal/modal'
import propTypes from 'prop-types'
import InactiveProductsTable from '../../../../common/components/inactiveProductsTable/inactiveProductsTable'
import { useActiveProductMutation } from '../../../../common/redux/products/productsApiSlice'
import { activeProducts } from '../../../../common/redux/products/productsSlice'
import { useDispatch } from 'react-redux'

const InactiveProducts = ({ handleShow, show, setShow }) => {
  const modalRef = useRef(null)
  const dispatch = useDispatch()
  usePressEscKey(() => handleShow(show, setShow))
  useClickOutside(modalRef, () => handleShow(show, setShow))
  const [msgError, setMsgError] = useState(null)

  const [activeProduct, { error, status, data }] = useActiveProductMutation()
  const handleActive = product => {
    try {
      activeProduct(product._id).unwrap()
    } catch (error) {
      setMsgError(error.message)
    }
  }

  useEffect(() => {
    if (status === 'fulfilled') {
      dispatch(activeProducts({ activeProduct: data.foundProduct }))
      setMsgError(null)
    }

    if (status === 'rejected') {
      setMsgError(error.data?.error)
    }
  }, [status])

  return (
    <Modal
      handleModal={() => handleShow(show, setShow)}
      active={show}
      modalTitle={'Productos Inactivos'}
      modalRef={modalRef}
      className={styles.container}
    >
      <InactiveProductsTable
        handleActive={handleActive}
        loading={status === 'pending'}
        msgError={msgError}
      />
    </Modal>
  )
}

export default InactiveProducts

InactiveProducts.propTypes = {
  handleShow: propTypes.func.isRequired,
  show: propTypes.bool.isRequired,
  setShow: propTypes.func.isRequired
}
