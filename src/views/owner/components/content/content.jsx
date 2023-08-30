import styles from './content.module.scss'
import Button from '../../../../common/components/button'
import EmployeesTable from '../employeesTable/'
import propTypes from 'prop-types'

const Content = ({
  employees,
  handleShowNewEmployee,
  handleShowUpdateEmployee,
  handleDeleteEmployee,
  handleModalInactiveEmployees,
  loading
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentHeader}>
        <Button color="secondary" onClick={handleShowNewEmployee}>
          Nuevo Empleado
        </Button>
        <Button color="secondary" onClick={handleModalInactiveEmployees}>
          Empleados Inactivos
        </Button>
      </div>
      <EmployeesTable
        employees={employees}
        handleShowUpdateEmployee={handleShowUpdateEmployee}
        handleDeleteEmployee={handleDeleteEmployee}
        loading={loading}
      />
    </div>
  )
}

export default Content

Content.propTypes = {
  employees: propTypes.array,
  handleShowNewEmployee: propTypes.func.isRequired,
  handleShowUpdateEmployee: propTypes.func.isRequired,
  handleDeleteEmployee: propTypes.func.isRequired,
  handleModalInactiveEmployees: propTypes.func.isRequired,
  loading: propTypes.bool
}

Content.defaultProps = {
  employees: [],
  loading: false
}
