import styles from './confirmOrder.module.scss'
import propTypes from 'prop-types'

const ConfirmOrder = ({ products }) => {
  return (
    <div className={styles.container}>
      <h3>Detalle de la venta</h3>
      <div className={styles.products}>
        {products.map((product, index) => {
          return (
            <div key={index} className={styles.product}>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.productPrice}>
                {product.quantity} x ${product.price}
              </div>
            </div>
          )
        })}
        <div className={styles.orderTotal}>
          <div className={styles.orderTotalLabel}>Total</div>
          <div className={styles.orderTotalPrice}>
            $ {products.reduce((acc, product) => acc + product.price * product.quantity, 0)}
          </div>
        </div>
      </div>
      <div className={styles.confirmOrder}>
        <h4>Confirmar Venta</h4>
        <div className={styles.buttons}>
          <button className={styles.button}>Efectivo</button>
          <button className={styles.button}>Tarjeta</button>
          <button className={styles.button}>Mercado Pago</button>
          <button className={styles.button}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmOrder

ConfirmOrder.propTypes = {
  products: propTypes.arrayOf(
    propTypes.shape({
      sku: propTypes.number,
      name: propTypes.string,
      price: propTypes.number,
      quantity: propTypes.number
    })
  )
}
