import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import {
  handleChangeSearch,
  handleChangeCategory,
  handleShow,
  handleChange,
  handleProductSubmit,
  handleCategorySubmit
} from './products.helpers'
import ProductsComponent from './components/products'

const Products = () => {
  const dispatch = useDispatch()

  const products = useSelector(selectCurrentProducts)
  const categories = useSelector(selectCurrentCategories)

  // states for view
  const [productsFiltered, setProductsFiltered] = useState(products)
  const [categoriesFiltred, setCategoriesFiltred] = useState(categories)
  const [showNewProduct, setShowNewProduct] = useState(false)
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [formValues, setFormValues] = useState({})
  const [msgError, setMsgError] = useState('')
  const [msgCategoryError, setMsgCategoryError] = useState('')

  // refs for search and category
  const searchRef = useRef()
  const categoryRef = useRef()

  // redux actions
  const [newProduct, { error: productError, status: productStatus, data: dataProduct }] =
    useNewProductMutation()

  const [newCategory, { error: categoryError, status: categoryStatus, data: dataCategory }] =
    useNewCategoryMutation()

  useEffect(() => {
    setProductsFiltered(products)
  }, [products])

  useEffect(() => {
    setCategoriesFiltred(categories)
  }, [categories])

  useEffect(() => {
    if (productStatus === 'fulfilled') {
      dispatch(newInternalProduct(dataProduct))
      const newProducts = [...products, dataProduct.savedProduct]
      setProductsFiltered(newProducts)
      setFormValues({})
      handleShow(showNewProduct, setMsgError, setFormValues, setShowNewProduct)
    }

    if (productStatus === 'rejected') {
      setMsgError(productError.data?.error)
    }
  }, [productStatus])

  useEffect(() => {
    if (categoryStatus === 'fulfilled') {
      dispatch(newInternalCategory(dataCategory))
      // const newCategories = [...categories, dataCategory]
      // setCategoriesFiltred(newCategories)
      setFormValues({})
      handleShow(showNewCategory, setMsgCategoryError, setFormValues, setShowNewCategory)
    }

    if (categoryStatus === 'rejected') {
      setMsgCategoryError(categoryError.data?.error)
    }
  }, [categoryStatus])

  return (
    <ProductsComponent
      handleShow={handleShow}
      showNewProduct={showNewProduct}
      setMsgError={setMsgError}
      setFormValues={setFormValues}
      setShowNewProduct={setShowNewProduct}
      showMewCategory={showNewCategory}
      setMsgCategoryError={setMsgCategoryError}
      setShowNewCategory={setShowNewCategory}
      handleChangeSearch={handleChangeSearch}
      handleChangeCategory={handleChangeCategory}
      products={products}
      categoryRef={categoryRef}
      setProductsFiltered={setProductsFiltered}
      searchRef={searchRef}
      categoriesFiltred={categoriesFiltred}
      productdFiltered={productsFiltered}
      newProduct={newProduct}
      newCategory={newCategory}
      formValues={formValues}
      handleChange={handleChange}
      handleProductSubmit={handleProductSubmit}
      handleCategorySubmit={handleCategorySubmit}
      msgError={msgError}
      msgCategoryError={msgCategoryError}
      productsFiltered={productsFiltered}
      showNewCategory={showNewCategory}
      categoriesFiltered={categoriesFiltred}
    />
  )
}

export default Products
