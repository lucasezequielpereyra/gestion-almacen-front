import styles from './products.module.scss'
import ProductsTable from '../../../components/productsTable'
import { selectCurrentProducts } from '../../../redux/products/productsSlice'
import { useSelector } from 'react-redux'

const Products = () => {
  const products = useSelector(selectCurrentProducts)

  return (
    <div className={styles.container}>
      <h1>Lista de Productos</h1>
      <ProductsTable products={products} />
    </div>
  )
}

export default Products
