import styles from './inactiveProducts.module.scss'
import propTypes from 'prop-types'
import { selectCurrentInactiveProducts } from '../../redux/products/productsSlice'
import { useSelector } from 'react-redux'
import Spinner from '../spinner/spinner'

const InactiveProductsTable = ({ handleActive, loading }) => {
  const inactiveProducts = useSelector(selectCurrentInactiveProducts)

  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        {loading && (
          <span>
            <Spinner size="md" /> Activando producto...
          </span>
        )}
      </div>
      <div className={styles.table}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>sku</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {inactiveProducts.map((product, index) => (
              <tr key={index}>
                <td className={styles.sku}>
                  {product.sku}
                  <button className={styles.actvBtn} onClick={() => handleActive(product)}>
                    activar
                  </button>
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InactiveProductsTable

InactiveProductsTable.propTypes = {
  handleActive: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired
}
