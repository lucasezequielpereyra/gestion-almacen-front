import { useState } from 'react'
import propTypes from 'prop-types'
import styles from './productModal.module.scss'
import classNames from 'class-names'
import RenderItems from './renderItems'

const ProductModal = ({ product, active }) => {
  const [modal, setModal] = useState(active)

  const objectProduct = Object.entries(product)

  const modalClass = classNames(styles.container, {
    [styles.active]: modal
  })

  return (
    <div className={modalClass}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Detalles del Producto</h3>
          <button className={styles.closeButton}>x</button>
        </div>
        <div className={styles.modalBody}>
          <RenderItems product={objectProduct} />
        </div>
      </div>
    </div>
  )
}

export default ProductModal

ProductModal.propTypes = {
  product: propTypes.object.isRequired,
  active: propTypes.bool.isRequired
}
