import propTypes from 'prop-types'
import styles from './productsTable.module.scss'

const ProductsTable = ({ products }) => {
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
                  <button className={styles.buttonHover}>editar</button>
                </td>
                <td>{product.name}</td>
                <td>{product.stock ? product.stock : 'none'}</td>
                <td>{product.price_cost}</td>
                <td>{product.price_sale ? product.price_sale : 'none'}</td>
                <td>{product.EAN}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ProductsTable

ProductsTable.propTypes = {
  products: propTypes.array.isRequired
}
