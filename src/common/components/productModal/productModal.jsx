import propTypes from 'prop-types'
import RenderItems from './renderItems'
import Modal from '../modal'

const ProductModal = ({ product, active, handleModal, modalRef }) => {
  return (
    <Modal
      modalTitle="Detalles del Producto"
      handleModal={handleModal}
      active={active}
      modalRef={modalRef}
    >
      <RenderItems product={product} />
    </Modal>
  )
}

export default ProductModal

ProductModal.propTypes = {
  product: propTypes.object.isRequired,
  active: propTypes.bool.isRequired,
  handleModal: propTypes.func.isRequired,
  modalRef: propTypes.object
}
