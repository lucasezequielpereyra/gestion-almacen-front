import { useState, useRef, useEffect } from 'react'
import Modal from '../../common/components/modal'
import propTypes from 'prop-types'
import ConfirmOrderComponent from './components/confirmOrder'
import CashOrder from './components/cashOrder'
import { newInternalSale } from '../../common/redux/sales/salesSlice'
import { useNewSaleMutation } from '../../common/redux/sales/salesApiSlice'
import { useDispatch } from 'react-redux'

const OrderConfirm = ({
  cartProducts,
  modalConfirm,
  setModalConfirm,
  modalref,
  handleModal,
  handleReset
}) => {
  // state hooks
  const [modalCash, setModalCash] = useState(false)
  const [loading, setLoading] = useState(false)
  const [msgError, setMsgError] = useState('')

  // ref hooks
  const modalCashRef = useRef()

  // redux actions
  const dispatch = useDispatch()

  // redux mutations
  const [newSale, { error: newSaleError, status: newSaleStatus, data: newSaleData }] =
    useNewSaleMutation()

  // effect to update local state when redux state changes
  useEffect(() => {
    if (newSaleStatus === 'pending') {
      setLoading(true)
    }

    if (newSaleStatus === 'rejected') {
      setMsgError(newSaleError.error)
      setLoading(false)
    }

    if (newSaleStatus === 'fulfilled') {
      dispatch(newInternalSale(newSaleData))
      handleReset()
      setModalConfirm(false)
      setLoading(false)
    }
  }, [newSaleStatus])

  // handlers
  const handleCash = () => {
    setModalCash(!modalCash)
  }

  const handleBack = () => {
    setModalCash(!modalCash)
  }

  const handleSubmitOrder = typePayment => {
    try {
      newSale({
        products: cartProducts.map(prod => ({
          id: prod.id,
          quantity: prod.quantity
        })),
        method: typePayment,
        total: cartProducts.reduce((acc, product) => acc + product.price * product.quantity, 0)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Modal
        handleModal={handleModal}
        modalTitle="Confirmar venta"
        active={modalConfirm}
        modalRef={modalref}
        size="lg"
      >
        <ConfirmOrderComponent
          products={cartProducts}
          handleCash={handleCash}
          handleClose={handleModal}
        />
      </Modal>
      {modalCash && (
        <Modal
          handleModal={handleBack}
          modalTitle="Pago en efectivo"
          active={modalCash}
          modalRef={modalCashRef}
          size="lg"
        >
          <CashOrder
            handleBack={handleBack}
            totalOrder={cartProducts.reduce(
              (acc, product) => acc + product.price * product.quantity,
              0
            )}
            confirmOrder={handleSubmitOrder}
            loading={loading}
            msgError={msgError}
          />
        </Modal>
      )}
    </>
  )
}

export default OrderConfirm

OrderConfirm.propTypes = {
  cartProducts: propTypes.array.isRequired,
  modalConfirm: propTypes.bool.isRequired,
  setModalConfirm: propTypes.func.isRequired,
  modalref: propTypes.object,
  handleModal: propTypes.func.isRequired,
  handleReset: propTypes.func.isRequired
}
