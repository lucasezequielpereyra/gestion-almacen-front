import { useState, useEffect, useRef } from 'react'
import styles from './products.module.scss'
import ProductsList from './productsList'
import { selectCurrentProducts } from '../../../common/redux/products/productsSlice'
import { useSelector } from 'react-redux'
import ProductForm from '../../../common/components/productForm'
import { useNewProductMutation } from '../../../common/redux/products/productsApiSlice'
import { useGetCategoriesQuery } from '../../../common/redux/products/productsApiSlice'

const Products = () => {
  const products = useSelector(selectCurrentProducts)
  const [productsFiltered, setProductsFiltered] = useState(products)
  const [showNewProduct, setShowNewProduct] = useState(false)
  const [formValues, setFormValues] = useState({})
  const [msgError, setMsgError] = useState('')
  const [categories, setCategories] = useState([])

  const searchRef = useRef()
  const categoryRef = useRef()

  useEffect(() => {
    if (searchRef.value === '' && categoryRef.value === 0) {
      setProductsFiltered(products)
    }
  }, [searchRef.value, categoryRef.value])

  const handleChangeSearch = e => {
    const {
      target: { value }
    } = e
    const productsFiltered = products.filter(product => {
      return product.name.toLowerCase().includes(value.toLowerCase())
    })
    setProductsFiltered(productsFiltered)
  }

  const handleChangeCategories = e => {
    const {
      target: { value }
    } = e
    const productsFiltered = products.filter(product => {
      return product.category._id === value
    })
    if (value !== '0') {
      setProductsFiltered(productsFiltered)
    }
  }

  const handleShowNewProduct = () => {
    setShowNewProduct(!showNewProduct)
  }

  const [newProduct, { error, status }] = useNewProductMutation()
  const handleSubmit = e => {
    e.preventDefault()
    try {
      newProduct({
        sku: formValues.sku,
        name: formValues.name,
        category: formValues.category,
        description: formValues.description,
        EAN: formValues.EAN,
        price_cost: formValues.price_cost,
        price_sale: formValues.price_sale,
        stock: formValues.stock
      }).unwrap()
    } catch (err) {
      setMsgError(err.message)
    }
  }

  useEffect(() => {
    if (status === 'fulfilled') {
      setFormValues({})
      handleShowNewProduct()
    }

    if (status === 'rejected') {
      setMsgError(error.data?.error)
    }
  }, [status])

  const { data: data, isSuccess } = useGetCategoriesQuery()
  useEffect(() => {
    if (isSuccess) {
      setCategories(data.categories)
    }
  }, [data])

  const handleChange = e => {
    const {
      target: { name, value }
    } = e
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <div className={styles.container}>
      <button className={styles.buttonAdd} onClick={handleShowNewProduct}>
        Nuevo Producto
      </button>
      <div className={styles.content}>
        <h1>Lista de Productos</h1>
        <div className={styles.filterContainer}>
          <input
            type="text"
            placeholder="Buscar por nombre"
            onChange={handleChangeSearch}
            ref={searchRef}
          />
          <div className={styles.filterCategory}>
            <select onChange={handleChangeCategories} ref={categoryRef}>
              <option value="0">Todas las categorias</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <ProductsList products={productsFiltered} />
      </div>
      {showNewProduct && (
        <ProductForm
          handleModal={handleShowNewProduct}
          active={Boolean(showNewProduct)}
          buttonLabel="Agregar"
          formValues={formValues}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          msgError={msgError}
          categories={categories}
        />
      )}
    </div>
  )
}

export default Products
