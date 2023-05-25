import { useState, useRef, useEffect } from 'react'
import styles from './addProductForm.module.scss'
import propTypes from 'prop-types'
import Modal from '../modal'
import FormItems from './formItems'
import { usePressEscKey } from '../../hooks/usePressEscKey'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useNewProductMutation } from '../../redux/products/productsApiSlice'
import { useGetCategoriesQuery } from '../../redux/products/productsApiSlice'

const AddProductForm = ({ active, handleModal, buttonLabel }) => {
  const [formValues, setFormValues] = useState({})
  const [msgError, setMsgError] = useState('')
  const [categories, setCategories] = useState([])
  const modalRef = useRef(null)

  usePressEscKey(handleModal)
  useClickOutside(modalRef, handleModal)

  const [newProduct, { error, status }] = useNewProductMutation()
  const { data: data, isSuccess } = useGetCategoriesQuery()

  const handleChange = e => {
    const {
      target: { name, value }
    } = e
    setFormValues({ ...formValues, [name]: value })
  }

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
      handleModal()
    }

    if (status === 'rejected') {
      setMsgError(error.data?.error)
    }
  }, [status])

  useEffect(() => {
    if (isSuccess) {
      setCategories(data.categories)
    }
  }, [data])

  return (
    <Modal
      handleModal={handleModal}
      active={active}
      modalRef={modalRef}
      modalTitle="Agregar Producto"
    >
      <p className={styles.error}>{msgError}</p>
      <form className={styles.container} onSubmit={handleSubmit}>
        <FormItems
          formValues={formValues}
          handleChange={handleChange}
          categories={categories}
          buttonLabel={buttonLabel}
        />
      </form>
    </Modal>
  )
}

export default AddProductForm

AddProductForm.propTypes = {
  active: propTypes.bool.isRequired,
  handleModal: propTypes.func.isRequired,
  buttonLabel: propTypes.string.isRequired
}

AddProductForm.defaultProps = {
  active: false,
  handleModal: () => {}
}
