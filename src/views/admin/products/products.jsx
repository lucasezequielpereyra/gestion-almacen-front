import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  newInternalProduct,
  selectCurrentProducts
} from '../../../common/redux/products/productsSlice'
import { newInternalCategory } from '../../../common/redux/categories/categoriesSlice'
import { useNewProductMutation } from '../../../common/redux/products/productsApiSlice'
import { useNewCategoryMutation } from '../../../common/redux/categories/categoriesApiSlice'
import * as Helpers from './products.helpers'
import ProductsComponent from './components/products'

const Products = () => {
  const dispatch = useDispatch()

  const products = useSelector(selectCurrentProducts)

  // states for view
  const [productsFiltered, setProductsFiltered] = useState(products)
  const [showNewProduct, setShowNewProduct] = useState(false)
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [showInactiveProducts, setShowInactivePRoducts] = useState(false)
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
    if (productStatus === 'fulfilled') {
      dispatch(newInternalProduct(dataProduct))
      setFormValues({})
      Helpers.handleShow(showNewProduct, setMsgError, setFormValues, setShowNewProduct)
    }

    if (productStatus === 'rejected') {
      setMsgError(productError.data?.error)
    }
  }, [productStatus])

  useEffect(() => {
    if (categoryStatus === 'fulfilled') {
      dispatch(newInternalCategory(dataCategory))
      setFormValues({})
      Helpers.handleShow(showNewCategory, setMsgCategoryError, setFormValues, setShowNewCategory)
    }

    if (categoryStatus === 'rejected') {
      setMsgCategoryError(categoryError.data?.error)
    }
  }, [categoryStatus])

  return (
    <ProductsComponent
      handleShow={Helpers.handleShow}
      showNewProduct={showNewProduct}
      setMsgError={setMsgError}
      setFormValues={setFormValues}
      setShowNewProduct={setShowNewProduct}
      showMewCategory={showNewCategory}
      setMsgCategoryError={setMsgCategoryError}
      setShowNewCategory={setShowNewCategory}
      handleChangeSearch={Helpers.handleChangeSearch}
      handleChangeCategory={Helpers.handleChangeCategory}
      products={products}
      categoryRef={categoryRef}
      setProductsFiltered={setProductsFiltered}
      searchRef={searchRef}
      productdFiltered={productsFiltered}
      newProduct={newProduct}
      newCategory={newCategory}
      formValues={formValues}
      handleChange={Helpers.handleChange}
      handleProductSubmit={Helpers.handleProductSubmit}
      handleCategorySubmit={Helpers.handleCategorySubmit}
      msgError={msgError}
      msgCategoryError={msgCategoryError}
      productsFiltered={productsFiltered}
      showNewCategory={showNewCategory}
      handleShowInactiveProducts={Helpers.handleShowInactiveProducts}
      showInactiveProducts={showInactiveProducts}
      setShowInactiveProducts={setShowInactivePRoducts}
      loading={productStatus === 'pending' || categoryStatus === 'pending'}
    />
  )
}

export default Products
