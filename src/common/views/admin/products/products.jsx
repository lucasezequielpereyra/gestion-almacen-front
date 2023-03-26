import { useState } from 'react'
import styles from './products.module.scss'
import ProductsTable from '../../../components/productsTable'
import { selectCurrentProducts } from '../../../redux/products/productsSlice'
import { useSelector } from 'react-redux'
import AddProductForm from '../../../components/addProductForm'

const Products = () => {
  const products = useSelector(selectCurrentProducts)
  const [showNewProduct, setShowNewProduct] = useState(false)

  const handleShowNewProduct = () => {
    setShowNewProduct(!showNewProduct)
  }

  return (
    <div className={styles.container}>
      <button className={styles.buttonAdd} onClick={handleShowNewProduct}>
        Nuevo Producto
      </button>
      <div className={styles.content}>
        <h1>Lista de Productos</h1>
        <ProductsTable products={products} />
      </div>
      {showNewProduct && (
        <AddProductForm handleModal={handleShowNewProduct} active={Boolean(showNewProduct)} />
      )}
    </div>
  )
}

export default Products
