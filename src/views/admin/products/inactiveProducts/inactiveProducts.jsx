import { useRef, useState, useEffect } from 'react'
import { usePressEscKey } from '../../../../common/hooks/usePressEscKey'
import { useClickOutside } from '../../../../common/hooks/useClickOutside'
import Modal from '../../../../common/components/modal/modal'
import propTypes from 'prop-types'
import InactiveProductsTable from '../components/inactiveProductsTable/'
import { useActiveProductMutation } from '../../../../common/redux/products/productsApiSlice'
import { activeProducts } from '../../../../common/redux/products/productsSlice'
import { useDispatch } from 'react-redux'

const InactiveProducts = ({ handleModal, showInactiveProducts, setShowInactiveProducts }) => {
  const modalRef = useRef(null)

  // custom hooks
  usePressEscKey(() => handleModal(showInactiveProducts, setShowInactiveProducts))
  useClickOutside(modalRef, () => handleModal(showInactiveProducts, setShowInactiveProducts))

  // states
  const [msgError, setMsgError] = useState(null)
  const [loading, setLoading] = useState(false)

  // redux actions
  const dispatch = useDispatch()
  const [activeProduct, { error, status, data }] = useActiveProductMutation()

  // effect for active product
  useEffect(() => {
    if (status === 'pending') setLoading(true)

    if (status === 'fulfilled') {
      dispatch(activeProducts({ activeProduct: data.foundProduct }))
      setMsgError('')
      setLoading(false)
    }

    if (status === 'rejected') {
      setMsgError(error.data?.error)
      setLoading(false)
    }
  }, [status])

  // handle active product
  const handleActive = product => {
    try {
      activeProduct(product._id).unwrap()
    } catch (error) {
      setMsgError(error.message)
    }
  }

  return (
    <Modal
      handleModal={() => handleModal(showInactiveProducts, setShowInactiveProducts)}
      active={showInactiveProducts}
      modalTitle={'Productos Inactivos'}
      modalRef={modalRef}
      size="lg"
    >
      <InactiveProductsTable handleActive={handleActive} loading={loading} msgError={msgError} />
    </Modal>
  )
}

export default InactiveProducts

InactiveProducts.propTypes = {
  handleModal: propTypes.func.isRequired,
  showInactiveProducts: propTypes.bool.isRequired,
  setShowInactiveProducts: propTypes.func.isRequired
}
