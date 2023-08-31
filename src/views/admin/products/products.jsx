import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentProducts } from '../../../common/redux/products/productsSlice'
import {
  newInternalCategory,
  selectCurrentCategories
} from '../../../common/redux/categories/categoriesSlice'
import { useNewCategoryMutation } from '../../../common/redux/categories/categoriesApiSlice'
import * as Methods from './products.methods'
import Content from './components/content'
import NewProduct from './newProduct'

const Products = () => {
  const dispatch = useDispatch()

  const products = useSelector(selectCurrentProducts)
  const categories = useSelector(selectCurrentCategories)

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
  const [newCategory, { error: categoryError, status: categoryStatus, data: dataCategory }] =
    useNewCategoryMutation()

  useEffect(() => {
    setProductsFiltered(products)
  }, [products])

  useEffect(() => {
    if (categoryStatus === 'fulfilled') {
      dispatch(newInternalCategory(dataCategory))
      setFormValues({})
      Methods.handleShow(showNewCategory, setMsgCategoryError, setFormValues, setShowNewCategory)
    }

    if (categoryStatus === 'rejected') {
      setMsgCategoryError(categoryError.data?.error)
    }
  }, [categoryStatus])

  return (
    <>
      <Content
        handleShow={Methods.handleShow}
        handleShowInactiveProducts={Methods.handleShowInactiveProducts}
        handleChangeSearch={Methods.handleChangeSearch}
        searchRef={searchRef}
        handleChangeCategory={Methods.handleChangeCategory}
        categoryRef={categoryRef}
        categories={categories}
        productsFiltered={productsFiltered}
        products={products}
        showNewProduct={showNewProduct}
        setMsgError={setMsgError}
        setFormValues={setFormValues}
        setShowNewProduct={setShowNewProduct}
        showNewCategory={showNewCategory}
        setMsgCategoryError={setMsgCategoryError}
        setShowNewCategory={setShowNewCategory}
        showInactiveProducts={showInactiveProducts}
        setShowInactiveProducts={setShowInactivePRoducts}
        setProductsFiltered={setProductsFiltered}
      />
      {showNewProduct && (
        <NewProduct
          handleModal={Methods.handleShow}
          showNewProduct={showNewProduct}
          setShowNewProduct={setShowNewProduct}
        />
      )}
    </>
  )
}

export default Products
