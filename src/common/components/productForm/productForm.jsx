import { useRef } from 'react'
import styles from './productForm.module.scss'
import propTypes from 'prop-types'
import Modal from '../modal'
import FormItems from './formItems'
import { usePressEscKey } from '../../hooks/usePressEscKey'
import { useClickOutside } from '../../hooks/useClickOutside'

const ProductForm = ({
  active,
  handleModal,
  buttonLabel,
  formValues,
  handleChange,
  handleSubmit,
  msgError,
  categories
}) => {
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
        <FormItems
          formValues={formValues}
          handleChange={handleChange}
          categories={categories}
          buttonLabel={buttonLabel}
        />
      </form>
    </Modal>
  )
}

export default ProductForm

ProductForm.propTypes = {
  active: propTypes.bool.isRequired,
  handleModal: propTypes.func.isRequired,
  buttonLabel: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  msgError: propTypes.string.isRequired,
  categories: propTypes.array.isRequired,
  formValues: propTypes.object.isRequired
}

ProductForm.defaultProps = {
  active: false,
  handleModal: () => {}
}
