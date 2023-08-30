import styles from './formItems.module.scss'
import propTypes from 'prop-types'
import Button from '../../../../common/components/button/'
import Select from 'react-select'
import Spinner from '../../../../common/components/spinner/'

const FormItems = ({
  formValues,
  handleChange,
  buttonLabel,
  loading,
  availableRoles,
  employeeRoles
}) => {
  const options = availableRoles.map(role => ({
    value: role._id,
    label: role.name
  }))

  return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor="username">Usuario</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={formValues.username || ''}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="roles">roles</label>
        <Select
          placeholder="Selecciona los roles"
          className={styles.select}
          styles={{
            control: styles => ({
              ...styles,
              backgroundColor: 'transparent',
              border: '1px solid #831010',
              boxShadow: 'none',
              '&:hover': {
                border: '1px solid #831010'
              }
            }),
            option: styles => ({
              ...styles,
              backgroundColor: 'transparent',
              color: '#831010',
              '&:hover': {
                backgroundColor: '#564d4d',
                color: '#fff'
              }
            }),
            dropdownIndicator: styles => ({
              ...styles,
              color: '#831010',
              paddingTop: 0,
              paddingBottom: 0
            })
          }}
          name="roles"
          id="roles"
          options={options}
          isMulti
          onChange={handleChange}
          isClearable={false}
          defaultValue={employeeRoles}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={handleChange}
          value={formValues.email || ''}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={formValues.password || ''}
        />
      </div>
      <div className={styles.formGroup}>
        <Button type="submit" color="primary" block uppercase onClick={() => null}>
          {loading && <Spinner size="sm" />} {buttonLabel}
        </Button>
      </div>
    </>
  )
}

export default FormItems

FormItems.propTypes = {
  formValues: propTypes.object.isRequired,
  handleChange: propTypes.func.isRequired,
  buttonLabel: propTypes.string.isRequired,
  loading: propTypes.bool.isRequired,
  availableRoles: propTypes.array.isRequired,
  employeeRoles: propTypes.array
}

FormItems.defaultProps = {
  employeeRoles: []
}
