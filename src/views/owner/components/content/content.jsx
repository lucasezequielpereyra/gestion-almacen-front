import styles from './content.module.scss'
import Button from '../../../../common/components/button'
import EmployeesTable from '../employeesTable/'
import propTypes from 'prop-types'

const Content = ({ employees, handleShowNewEmployee, handleShowUpdateEmployee }) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentHeader}>
        <Button color="secondary" onClick={handleShowNewEmployee}>
          Nuevo Empleado
        </Button>
        <Button color="secondary">Empleados Inactivos</Button>
      </div>
      <EmployeesTable employees={employees} handleShowUpdateEmployee={handleShowUpdateEmployee} />
    </div>
  )
}

export default Content

Content.propTypes = {
  employees: propTypes.array,
  handleShowNewEmployee: propTypes.func.isRequired,
  handleShowUpdateEmployee: propTypes.func.isRequired
}

Content.defaultProps = {
  employees: []
}
