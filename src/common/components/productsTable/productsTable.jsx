import propTypes from 'prop-types'
import { useState, useEffect } from 'react'
import styles from './productsTable.module.scss'
import { usePressEscKey } from '../../hooks/usePressEscKey'
import { useGetCategoriesQuery } from '../../redux/products/productsApiSlice'
import { useUpdateProductMutation } from '../../redux/products/productsApiSlice'
import ProductForm from '../productForm'

const ProductsTable = ({ products }) => {
  const [modal, setModal] = useState(false)
  const [productModal, setProductModal] = useState({})
  const [formValues, setFormValues] = useState({})
  const [msgError, setMsgError] = useState('')
  const [categories, setCategories] = useState([])

  usePressEscKey(setModal)

  const handleModal = product => {
    if (!modal) setProductModal(product)
    if (modal) {
      setFormValues({})
      setMsgError('')
    }
    setModal(!modal)
  }

  const [updateProduct, { error, status }] = useUpdateProductMutation()
  const handleSubmit = e => {
    e.preventDefault()
    try {
      updateProduct({
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
    <>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>nombre</th>
              <th>stock</th>
              <th>Precio Costo</th>
              <th>Precio Venta</th>
              <th>ean</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className={styles.sku}>
                  {product.sku}
                  <button className={styles.buttonHover} onClick={() => handleModal(product)}>
                    editar
                  </button>
                </td>
                <td>{product.name}</td>
                <td>{product.stock ? product.stock : 'n/a'}</td>
                <td>{product.price_cost}</td>
                <td>{product.price_sale ? product.price_sale : 'n/a'}</td>
                <td>{product.EAN ? product.EAN : 'n/a'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal && (
          <ProductForm
            handleModal={handleModal}
            active={modal}
            buttonLabel="Actualizar"
            formValues={formValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            msgError={msgError}
            categories={categories}
          />
        )}
      </div>
    </>
  )
}

export default ProductsTable

ProductsTable.propTypes = {
  products: propTypes.array.isRequired
}
