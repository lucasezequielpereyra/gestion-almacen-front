import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentProducts } from '../../../common/redux/products/productsSlice'
import { selectCurrentCategories } from '../../../common/redux/categories/categoriesSlice'
import * as Methods from './products.methods'
import Content from './components/content'
import NewProduct from './newProduct'
import NewCategory from './newCategory'

const Products = () => {
  const products = useSelector(selectCurrentProducts)
  const categories = useSelector(selectCurrentCategories)

  // states for view
  const [productsFiltered, setProductsFiltered] = useState(products)
  const [showNewProduct, setShowNewProduct] = useState(false)
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [showInactiveProducts, setShowInactivePRoducts] = useState(false)
  const [msgError, setMsgError] = useState('')
  const [formValues, setFormValues] = useState({})

  // refs for search and category
  const searchRef = useRef()
  const categoryRef = useRef()

  // effect for initial state in filtered products
  useEffect(() => {
    setProductsFiltered(products)
  }, [products])

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
        setMsgCategoryError={setMsgError}
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
          formValues={formValues}
          setFormValues={setFormValues}
          msgError={msgError}
          setMsgError={setMsgError}
        />
      )}
      {showNewCategory && (
        <NewCategory
          handleModal={Methods.handleShow}
          showNewCategory={showNewCategory}
          setShowNewCategory={setShowNewCategory}
          formValues={formValues}
          setFormValues={setFormValues}
          msgError={msgError}
          setMsgError={setMsgError}
        />
      )}
    </>
  )
}

export default Products
