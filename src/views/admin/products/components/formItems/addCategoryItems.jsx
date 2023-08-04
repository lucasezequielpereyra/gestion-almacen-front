import styles from './formItems.module.scss'
import propTypes from 'prop-types'
import Spinner from '../../../../../common/components/spinner/spinner'

const AddCategoryItems = ({ formValues, handleChange, buttonLabel, loading }) => {
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
        <button type="submit">
          {loading && <Spinner size="sm" />} {buttonLabel}
        </button>
      </div>
    </>
  )
}

export default AddCategoryItems

AddCategoryItems.propTypes = {
  formValues: propTypes.object.isRequired,
  handleChange: propTypes.func.isRequired,
  buttonLabel: propTypes.string.isRequired,
  loading: propTypes.bool.isRequired
}
