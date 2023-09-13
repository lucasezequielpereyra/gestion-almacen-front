import { useState, useRef } from 'react'
import Modal from '../../common/components/modal'
import propTypes from 'prop-types'
import ConfirmOrderComponent from './components/confirmOrder'
import CashOrder from './components/cashOrder'

const OrderConfirm = ({ cartProducts, modalConfirm, setModalConfirm, modalref, handleConfirm }) => {
  // state hooks
  const [modalCash, setModalCash] = useState(false)

  // ref hooks
  const modalCashRef = useRef()

  // handlers
  const handleCash = () => {
    setModalConfirm(false)
    setModalCash(!modalCash)
  }

  const handleBack = setState => {
    setState(false)
    setModalConfirm(true)
  }

  return (
    <>
      <Modal
        handleModal={handleConfirm}
        modalTitle="Confirmar venta"
        active={modalConfirm}
        modalRef={modalref}
        size="lg"
      >
        <ConfirmOrderComponent
          products={cartProducts}
          handleCash={handleCash}
          handleClose={handleConfirm}
        />
      </Modal>
      {modalCash && (
        <Modal
          handleModal={() => handleBack(setModalCash)}
          modalTitle="Pago en efectivo"
          active={modalCash}
          modalRef={modalCashRef}
          size="lg"
        >
          <CashOrder
            handleBack={() => handleBack(setModalCash)}
            totalOrder={cartProducts.reduce(
              (acc, product) => acc + product.price * product.quantity,
              0
            )}
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
  handleConfirm: propTypes.func.isRequired
}
