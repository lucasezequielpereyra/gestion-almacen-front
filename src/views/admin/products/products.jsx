import { useState, useEffect, useRef } from 'react'
import styles from './products.module.scss'
import ProductsList from './productsList'
import { selectCurrentProducts } from '../../../common/redux/products/productsSlice'
import { useSelector } from 'react-redux'
import Form from '../../../common/components/form/'
import AddProductItems from './components/formItems/'
import { useNewProductMutation } from '../../../common/redux/products/productsApiSlice'
import { useGetCategoriesQuery } from '../../../common/redux/categories/categoriesApiSlice'

const Products = () => {
  const products = useSelector(selectCurrentProducts)

  // states for view
  const [productsFiltered, setProductsFiltered] = useState(products)
  const [showNewProduct, setShowNewProduct] = useState(false)
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [formValues, setFormValues] = useState({})
  const [msgError, setMsgError] = useState('')
  const [msgCategoryError, setMsgCategoryError] = useState('')
  const [categories, setCategories] = useState([])

  // refs for search and category
  const searchRef = useRef()
  const categoryRef = useRef()

  // Filter products by search and category
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

  // handle modals
  const handleShowNewProduct = () => {
    setShowNewProduct(!showNewProduct)
  }

  const handleShowNewCategory = () => {
    setShowNewCategory(!showNewCategory)
  }

  // handle submit new product
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
      <div className={styles.menu}>
        <button className={styles.buttonAdd} onClick={handleShowNewProduct}>
          Nuevo Producto
        </button>
        <button className={styles.buttonAdd} onClick={handleShowNewCategory}>
          Nueva Categoria
        </button>
      </div>
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
        <Form
          handleModal={handleShowNewProduct}
          active={Boolean(showNewProduct)}
          handleSubmit={handleSubmit}
          msgError={msgError}
        >
          <AddProductItems
            formValues={formValues}
            handleChange={handleChange}
            categories={categories}
            buttonLabel="Agregar"
          />
        </Form>
      )}
      {showNewCategory && (
        <Form
          handleModal={handleShowNewCategory}
          modalTitle="Agregar Categoria"
          active={Boolean(showNewCategory)}
          msgError={msgCategoryError}
          handleSubmit={handleSubmit}
        >
          asd
        </Form>
      )}
    </div>
  )
}

export default Products
