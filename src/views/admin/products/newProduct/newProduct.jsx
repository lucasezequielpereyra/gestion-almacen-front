import { useEffect, useState } from 'react'
import Form from '../../../../common/components/form/'
import AddProductItems from '../components/formItems/addProductItems'
import propTypes from 'prop-types'
import { useNewProductMutation } from '../../../../common/redux/products/productsApiSlice'
import { useDispatch } from 'react-redux'
import { newInternalProduct } from '../../../../common/redux/products/productsSlice'

const NewProduct = ({ handleModal, showNewProduct, setShowNewProduct }) => {
  // states
  const [loading, setLoading] = useState(false)
  const [msgError, setMsgError] = useState('')
  const [formValues, setFormValues] = useState({})

  // redux actions
  const dispatch = useDispatch()
  const [newProduct, { error: productError, status: productStatus, data: dataProduct }] =
    useNewProductMutation()

  // effect for new product
  useEffect(() => {
    if (productStatus === 'pending') {
      setLoading(true)
    }
    if (productStatus === 'fulfilled') {
      dispatch(newInternalProduct(dataProduct))
      setFormValues({})
      handleModal(showNewProduct, setMsgError, setFormValues, setShowNewProduct)
      setLoading(false)
    }

    if (productStatus === 'rejected') {
      setMsgError(productError.data?.error)
      setLoading(false)
    }
  }, [productStatus])

  // method for controlled form
  const handleChange = e => {
    const {
      target: { name, value }
    } = e
    setFormValues({ ...formValues, [name]: value })
  }

  // method for submit
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
  return (
    <Form
      handleModal={() => handleModal(showNewProduct, setMsgError, setFormValues, setShowNewProduct)}
      active={showNewProduct}
      handleSubmit={handleSubmit}
      msgError={msgError}
      modalTitle="Agregar Producto"
    >
      <AddProductItems
        formValues={formValues}
        handleChange={handleChange}
        buttonLabel="Agregar"
        loading={loading}
      />
    </Form>
  )
}

export default NewProduct

NewProduct.propTypes = {
  handleModal: propTypes.func.isRequired,
  showNewProduct: propTypes.bool.isRequired,
  setShowNewProduct: propTypes.func.isRequired
}
