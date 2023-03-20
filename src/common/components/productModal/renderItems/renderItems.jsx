import propTypes from 'prop-types'
import styles from './renderItems.module.scss'

const RenderItems = ({ product }) => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <label htmlFor="">sku</label>
        <input type="text" defaultValue={product.sku} />
      </div>
      <div className={styles.item}>
        <label htmlFor="">nombre</label>
        <input type="text" defaultValue={product.name} />
      </div>
      <div className={styles.item}>
        <label htmlFor="">category</label>
        <input type="text" defaultValue={product.category.name} />
      </div>
      <div className={styles.item}>
        <label htmlFor="">ean</label>
        <input type="text" defaultValue={product.EAN} />
      </div>
      <div className={styles.item}>
        <label htmlFor="">stock</label>
        <input type="text" defaultValue={product.stock} />
      </div>
      <div className={styles.item}>
        <label htmlFor="">Costo</label>
        <input type="text" defaultValue={product.price_cost} />
      </div>
      <div className={styles.item}>
        <label htmlFor="">Venta</label>
        <input type="text" defaultValue={product.price_sale} />
      </div>
      <button>Actualizar</button>
    </div>
  )
}

export default RenderItems

RenderItems.propTypes = {
  product: propTypes.array.isRequired
}
