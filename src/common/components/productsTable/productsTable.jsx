import propTypes from 'prop-types'
import { useState, useRef } from 'react'
import styles from './productsTable.module.scss'
import ProductModal from '../productModal'
import { usePressEscKey } from '../../hooks/usePressEscKey'
import { useClickOutside } from '../../hooks/useClickOutside'

const ProductsTable = ({ products }) => {
  const [modal, setModal] = useState(false)
  const [productModal, setProductModal] = useState({})
  const modalRef = useRef(null)

  usePressEscKey(setModal)
  useClickOutside(modalRef, setModal)

  const handleModal = product => {
    setModal(!modal)
    setProductModal(product)
  }

  return (
    <>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>nombre</th>
              <th>stock</th>
              <th>Precio Costo</th>
              <th>Precio Venta</th>
              <th>ean</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className={styles.sku}>
                  {product.sku}
                  <button className={styles.buttonHover} onClick={() => handleModal(product)}>
                    editar
                  </button>
                </td>
                <td>{product.name}</td>
                <td>{product.stock ? product.stock : 'n/a'}</td>
                <td>{product.price_cost}</td>
                <td>{product.price_sale ? product.price_sale : 'n/a'}</td>
                <td>{product.EAN ? product.EAN : 'n/a'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal && (
          <ProductModal
            product={productModal}
            active={modal}
            handleModal={handleModal}
            modalRef={modalRef}
          />
        )}
      </div>
    </>
  )
}

export default ProductsTable

ProductsTable.propTypes = {
  products: propTypes.array.isRequired
}
