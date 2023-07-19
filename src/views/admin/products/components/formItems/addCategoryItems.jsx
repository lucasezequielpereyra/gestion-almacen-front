import styles from './formItems.module.scss'
import propTypes from 'prop-types'

const AddCategoryItems = ({ formValues, handleChange, categories, buttonLabel }) => {
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
        <input type="submit" value={buttonLabel} />
      </div>
    </>
  )
}

export default AddCategoryItems

AddCategoryItems.propTypes = {
  formValues: propTypes.object.isRequired,
  handleChange: propTypes.func.isRequired,
  categories: propTypes.array,
  buttonLabel: propTypes.string.isRequired
}

AddCategoryItems.defaultProps = {
  categories: []
}
