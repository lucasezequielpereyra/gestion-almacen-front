import styles from './formItems.module.scss'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectCurrentCategories } from '../../../../../common/redux/categories/categoriesSlice'
import Spinner from '../../../../../common/components/spinner/spinner'
import { useState, useEffect } from 'react'
import Button from '../../../../../common/components/button'

const AddProductItems = ({ formValues, handleChange, buttonLabel, loading, defaultCategory }) => {
  const categories = useSelector(selectCurrentCategories)

  const [selected, setSelected] = useState()

  useEffect(() => {
    if (!formValues.category) {
      return setSelected('default')
    }
    if (formValues.category) {
      return setSelected(formValues.category)
    }
  }, [formValues.category])

  useEffect(() => {
    if (defaultCategory) {
      setSelected(defaultCategory)
    }
  }, [])

  return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          value={formValues.name || ''}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="sku">Sku</label>
        <input
          type="text"
          name="sku"
          id="sku"
          onChange={handleChange}
          value={formValues.sku || ''}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="category">Categoria</label>
        <select name="category" id="category" onChange={handleChange} value={selected}>
          <option value="default" disabled>
            Seleccionar Categoria
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">Descripción</label>
        <input
          type="text"
          name="description"
          id="description"
          onChange={handleChange}
          value={formValues.description || ''}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="EAN">Ean</label>
        <input
          type="text"
          name="EAN"
          id="EAN"
          onChange={handleChange}
          value={formValues.EAN || ''}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="price_cost">Precio Costo</label>
        <input
          type="text"
          name="price_cost"
          id="price_cost"
          onChange={handleChange}
          value={formValues.price_cost || ''}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="price_sale">Precio Venta</label>
        <input
          type="text"
          name="price_sale"
          id="price_sale"
          onChange={handleChange}
          value={formValues.price_sale || ''}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="stock">Stock</label>
        <input
          type="text"
          name="stock"
          id="stock"
          onChange={handleChange}
          value={formValues.stock || ''}
        />
      </div>
      <div className={styles.formGroup}>
        <Button type="submit" color="primary" block uppercase>
          {loading && <Spinner size="sm" />} {buttonLabel}
        </Button>
      </div>
    </>
  )
}

export default AddProductItems

AddProductItems.propTypes = {
  formValues: propTypes.object.isRequired,
  handleChange: propTypes.func.isRequired,
  buttonLabel: propTypes.string.isRequired,
  loading: propTypes.bool.isRequired,
  defaultCategory: propTypes.string
}
