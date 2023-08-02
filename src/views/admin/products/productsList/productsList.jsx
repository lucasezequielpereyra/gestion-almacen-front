import { useState, useEffect } from 'react'
import { useGetCategoriesQuery } from '../../../../common/redux/categories/categoriesApiSlice'
import {
  useUpdateProductMutation,
  useDeleteProductMutation
} from '../../../../common/redux/products/productsApiSlice'
import {
  deleteInternalProduct,
  updateInternalProduct
} from '../../../../common/redux/products/productsSlice'
import { useDispatch } from 'react-redux'
import ProductsTable from '../../../../common/components/productsTable/productsTable'
import propTypes from 'prop-types'

const ProductsList = ({ products }) => {
  const [modalEdit, setModalEdit] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [productModal, setProductModal] = useState({})
  const [formValues, setFormValues] = useState({})
  const [msgError, setMsgError] = useState('')
  const [categories, setCategories] = useState([])
  const dispatch = useDispatch()

  const handleModalEdit = product => {
    setProductModal(product)
    setModalEdit(!modalEdit)
  }

  const handleModalDelete = product => {
    setProductModal(product)
    setModalDelete(!modalDelete)
  }

  const [updateProduct, { error: errorUpdate, status: statusUpdate, data: dataProduct }] =
    useUpdateProductMutation()
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
    if (statusUpdate === 'fulfilled') {
      dispatch(updateInternalProduct({ updatedProduct: dataProduct }))
      setFormValues({})
      setModalEdit(false)
    }

    if (statusUpdate === 'rejected') {
      setMsgError(errorUpdate.data?.error)
    }
  }, [statusUpdate])

  const [deleteProduct, { error: errorDelete, status: statusDelete }] = useDeleteProductMutation()
  const handleDelete = e => {
    e.preventDefault()
    try {
      deleteProduct(productModal._id).unwrap()
    } catch (err) {
      setMsgError(err.message)
    }
  }

  useEffect(() => {
    if (statusDelete === 'fulfilled') {
      setFormValues({})
      setModalDelete(false)
    }

    if (statusDelete === 'rejected') {
      setMsgError(errorDelete.data?.error)
    }
  }, [statusDelete])

  useEffect(() => {
    if (productModal) {
      setFormValues(productModal)
    }
  }, [productModal])

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
      modalEdit={modalEdit}
      formValues={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      msgError={msgError}
      categories={categories}
      productModal={productModal}
      handleModalEdit={handleModalEdit}
      handleModalDelete={handleModalDelete}
      handleDelete={handleDelete}
      modalDelete={modalDelete}
      loading={statusUpdate === 'pending' || statusDelete === 'pending'}
    />
  )
}

export default ProductsList

ProductsList.propTypes = {
  products: propTypes.array
}
