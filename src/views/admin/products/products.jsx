import { useState, useEffect, useRef } from 'react'
import styles from './products.module.scss'
import ProductsList from './productsList'
import { useDispatch, useSelector } from 'react-redux'
import Form from '../../../common/components/form/'
import AddProductItems from './components/formItems/addProductItems'
import AddCategoryItems from './components/formItems/addCategoryItems'
import {
  newInternalProduct,
  selectCurrentProducts
} from '../../../common/redux/products/productsSlice'
import {
  selectCurrentCategories,
  newInternalCategory
} from '../../../common/redux/categories/categoriesSlice'
import { useNewProductMutation } from '../../../common/redux/products/productsApiSlice'
import { useNewCategoryMutation } from '../../../common/redux/categories/categoriesApiSlice'

const Products = () => {
  const dispatch = useDispatch()

  const products = useSelector(selectCurrentProducts)
  const categories = useSelector(selectCurrentCategories)

  // states for view
  const [productsFiltered, setProductsFiltered] = useState(products)
  const [categoriesFiltren, setCategoriesFiltred] = useState(categories)
  const [showNewProduct, setShowNewProduct] = useState(false)
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [formValues, setFormValues] = useState({})
  const [msgError, setMsgError] = useState('')
  const [msgCategoryError, setMsgCategoryError] = useState('')

  useEffect(() => {
    setProductsFiltered(products)
  }, [products])

  useEffect(() => {
    setCategoriesFiltred(categories)
  }, [categories])

  // refs for search and category
  const searchRef = useRef()
  const categoryRef = useRef()

  const handleChangeSearch = e => {
    const {
      target: { value }
    } = e
    const copyProducts = [...products]
    const search = value.toLowerCase()
    const categorySearch = categoryRef.current.value

    const productsFiltered = copyProducts.filter(product => {
      const name = product.name.toLowerCase()
      return name.includes(search)
    })
    setProductsFiltered(productsFiltered)

    if (categorySearch != '0') {
      const category = categorySearch
      const productsFilteredByCategory = productsFiltered.filter(product => {
        return product.category._id == category
      })
      setProductsFiltered(productsFilteredByCategory)
    }
  }

  const handleChangeCategories = e => {
    const {
      target: { value }
    } = e

    const copyProducts = [...products]
    const searchRefValue = searchRef.current.value.toLowerCase()

    if (value == '0') {
      const productsFiltered = copyProducts.filter(product => {
        const name = product.name.toLowerCase()
        return name.includes(searchRefValue)
      })
      return setProductsFiltered(productsFiltered)
    }

    const productsFiltered = copyProducts.filter(product => {
      return product.category._id == value
    })
    setProductsFiltered(productsFiltered)
  }

  // handle modals
  const handleShowNewProduct = () => {
    if (showNewProduct) {
      setMsgError('')
      setFormValues({})
    }
    setShowNewProduct(!showNewProduct)
  }

  const handleShowNewCategory = () => {
    if (showNewCategory) {
      setMsgCategoryError('')
      setFormValues({})
    }
    setShowNewCategory(!showNewCategory)
  }

  // handle submit new product
  const [newProduct, { error: productError, status: productStatus, data: dataProduct }] =
    useNewProductMutation()
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
      dispatch(newInternalProduct(dataProduct))
      const newProducts = [...products, dataProduct.savedProduct]
      setProductsFiltered(newProducts)
      setFormValues({})
      handleShowNewProduct()
    }

    if (productStatus === 'rejected') {
      setMsgError(productError.data?.error)
    }
  }, [productStatus])

  // handle submit new category
  const [newCategory, { error: categoryError, status: categoryStatus, data: dataCategory }] =
    useNewCategoryMutation()
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
      dispatch(newInternalCategory(dataCategory))
      const newCategories = [...categories, dataCategory.savedCategory]
      setCategoriesFiltred(newCategories)
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
              {categoriesFiltren.map(category => (
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
            categories={categoriesFiltren}
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
