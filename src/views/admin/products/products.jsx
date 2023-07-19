import { useState, useEffect, useRef } from 'react'
import styles from './products.module.scss'
import ProductsList from './productsList'
import { selectCurrentProducts } from '../../../common/redux/products/productsSlice'
import { useSelector } from 'react-redux'
import Form from '../../../common/components/form/'
import AddProductItems from './components/formItems/addProductItems'
import AddCategoryItems from './components/formItems/addCategoryItems'
import { useNewProductMutation } from '../../../common/redux/products/productsApiSlice'
import { useGetCategoriesQuery } from '../../../common/redux/categories/categoriesApiSlice'
import { useNewCategoryMutation } from '../../../common/redux/categories/categoriesApiSlice'

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

  // get categories
  const { data: data, isSuccess } = useGetCategoriesQuery()
  useEffect(() => {
    if (isSuccess) {
      setCategories(data.categories)
    }
  }, [data])

  // handle submit new product
  const [newProduct, { error: productError, status: productStatus }] = useNewProductMutation()
  const handleProductSubmit = e => {
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
    if (productStatus === 'fulfilled') {
      setFormValues({})
      handleShowNewProduct()
    }

    if (productStatus === 'rejected') {
      setMsgError(productError.data?.error)
    }
  }, [productStatus])

  // handle submit new category
  const [newCategory, { error: categoryError, status: categoryStatus }] = useNewCategoryMutation()

  const handleCategorySubmit = e => {
    e.preventDefault()
    try {
      newCategory({
        name: formValues.name,
        description: formValues.description
      }).unwrap()
    } catch (err) {
      setMsgCategoryError(err.message)
    }
  }

  useEffect(() => {
    if (categoryStatus === 'fulfilled') {
      setFormValues({})
      handleShowNewCategory()
    }

    if (categoryStatus === 'rejected') {
      setMsgCategoryError(categoryError.data?.error)
    }
  }, [categoryStatus])

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
          handleSubmit={handleProductSubmit}
          msgError={msgError}
          modalTitle="Agregar Producto"
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
          handleSubmit={handleCategorySubmit}
        >
          <AddCategoryItems
            formValues={formValues}
            handleChange={handleChange}
            buttonLabel="Agregar"
          />
        </Form>
      )}
    </div>
  )
}

export default Products
