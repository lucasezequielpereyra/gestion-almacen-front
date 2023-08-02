import styles from './formItems.module.scss'
import propTypes from 'prop-types'

const AddProductItems = ({ formValues, handleChange, categories, buttonLabel }) => {
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
        <select name="category" id="category" onChange={handleChange}>
          <option hidden>Elige una Opción</option>

          {categories.map((category, index) => (
            <option
              key={index}
              value={category.name}
              selected={formValues.category?._id === category?._id}
            >
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
        <input type="submit" value={buttonLabel} />
      </div>
    </>
  )
}

export default AddProductItems

AddProductItems.propTypes = {
  formValues: propTypes.object.isRequired,
  handleChange: propTypes.func.isRequired,
  categories: propTypes.array,
  buttonLabel: propTypes.string.isRequired
}

AddProductItems.defaultProps = {
  categories: []
}
