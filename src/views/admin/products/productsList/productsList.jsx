import { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { useGetCategoriesQuery } from '../../../../common/redux/products/productsApiSlice'
import { useUpdateProductMutation } from '../../../../common/redux/products/productsApiSlice'
import ProductsTable from '../../../../common/components/productsTable/productsTable'

const ProductsList = ({ products }) => {
  const [modal, setModal] = useState(false)
  const [productModal, setProductModal] = useState({})
  const [formValues, setFormValues] = useState({})
  const [msgError, setMsgError] = useState('')
  const [categories, setCategories] = useState([])

  const handleModal = product => {
    setProductModal(product)
    setModal(!modal)
  }

  const [updateProduct, { error, status }] = useUpdateProductMutation()
  const handleSubmit = e => {
    e.preventDefault()
    try {
      updateProduct({
        id: productModal._id,
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
    if (productModal) {
      setFormValues(productModal)
    }
  }, [productModal])

  useEffect(() => {
    if (status === 'fulfilled') {
      setFormValues({})
      handleModal()
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
    <ProductsTable
      products={products}
      modal={modal}
      handleModal={handleModal}
      productModal={productModal}
      formValues={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      msgError={msgError}
      categories={categories}
    />
  )
}

export default ProductsList

ProductsTable.propTypes = {
  products: propTypes.array.isRequired
}
