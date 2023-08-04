import styles from './inactiveProduictsTable.module.scss'
import propTypes from 'prop-types'
import { selectCurrentInactiveProducts } from '../../../redux/products/productsSlice'
import { useSelector } from 'react-redux'

const InactiveProductsTable = () => {
  const inactiveProducts = useSelector(selectCurrentInactiveProducts)

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {inactiveProducts.map((product, index) => (
              <tr key={index}>
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
