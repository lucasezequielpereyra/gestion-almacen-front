import { useState } from 'react'
import propTypes from 'prop-types'
import styles from './productModal.module.scss'
import classNames from 'class-names'

const ProductModal = ({ product, active }) => {
  const [modal, setModal] = useState(active)

  const modalClass = classNames(styles.container, {
    [styles.active]: modal
  })

  return <div className={modalClass}>{product.name}</div>
}

export default ProductModal

ProductModal.propTypes = {
  product: propTypes.object.isRequired,
  active: propTypes.bool.isRequired
}
