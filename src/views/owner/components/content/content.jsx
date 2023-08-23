import styles from './content.module.scss'
import Button from '../../../../common/components/button'
import EmployeesTable from '../employeesTable/'
import propTypes from 'prop-types'

const Content = ({ employees }) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentHeader}>
        <Button color="secondary">Nuevo Empleado</Button>
        <Button color="secondary">Empleados Inactivos</Button>
      </div>
      <EmployeesTable employees={employees} />
    </div>
  )
}

export default Content

Content.propTypes = {
  employees: propTypes.array
}

Content.defaultProps = {
  employees: []
}
