import { FaCheck, FaCircleExclamation } from 'react-icons/fa6'
import styles from './content.module.scss'
import propTypes from 'prop-types'

const Content = ({
  inputSearchRef,
  quantityRef,
  handleAddProduct,
  handleDeleteProduct,
  msg,
  cartProducts,
  products,
  handleReset,
  handleConfirm
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentHeader}>
        <div className={styles.searchProduct}>
          <div className={styles.inputProduct}>
            <input
              list="products"
              name="products"
              placeholder="Busca un producto..."
              ref={inputSearchRef}
            />
            <div className={styles.msgSearch}>
              {msg && (
                <p>
                  <FaCircleExclamation /> {msg}
                </p>
              )}
            </div>
          </div>
          <input type="number" name="quantity" defaultValue={1} min={1} ref={quantityRef} />
          <datalist id="products">
            {products.map((product, index) => (
              <option key={index} value={product.name} />
            ))}
          </datalist>
          <button onClick={handleAddProduct}>
            <FaCheck className={styles.icon} />
          </button>
        </div>
        <div className={styles.confirmationProducts}>
          <button className={styles.confirm} onClick={handleConfirm}>
            Confirmar
          </button>
          <button className={styles.cancel} onClick={handleReset}>
            Restablecer
          </button>
        </div>
      </div>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>sku</th>
              <th>producto</th>
              <th>cantidad</th>
              <th>precio</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((product, index) => {
              return (
                <tr key={index}>
                  <td>
                    {product.sku}
                    <button
                      className={styles.deleteProduct}
                      onClick={handleDeleteProduct(product.name)}
                    >
                      quitar
                    </button>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Content

Content.propTypes = {
  inputSearchRef: propTypes.object.isRequired,
  quantityRef: propTypes.object.isRequired,
  handleAddProduct: propTypes.func.isRequired,
  handleDeleteProduct: propTypes.func.isRequired,
  msg: propTypes.string.isRequired,
  cartProducts: propTypes.array.isRequired,
  products: propTypes.array.isRequired,
  handleReset: propTypes.func.isRequired,
  handleConfirm: propTypes.func.isRequired
}
