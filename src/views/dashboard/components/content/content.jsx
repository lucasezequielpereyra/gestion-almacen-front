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
  products
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.searchProduct}>
        <input
          list="products"
          name="products"
          placeholder="Busca un producto..."
          ref={inputSearchRef}
        />
        <input type="number" name="quantity" defaultValue={1} ref={quantityRef} />
        <datalist id="products">
          {products.map((product, index) => (
            <option key={index} value={product.name} />
          ))}
        </datalist>
        <button onClick={handleAddProduct}>
          <FaCheck className={styles.icon} />
        </button>
      </div>
      <div className={styles.msgSearch}>
        {msg && (
          <p>
            <FaCircleExclamation /> {msg}
          </p>
        )}
      </div>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
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
                    {product.name}{' '}
                    <button
                      className={styles.deleteProduct}
                      onClick={handleDeleteProduct(product.name)}
                    >
                      quitar
                    </button>
                  </td>
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
  products: propTypes.array.isRequired
}
