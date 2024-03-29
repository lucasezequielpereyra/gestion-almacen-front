import styles from './employeesTable.module.scss'
import propTypes from 'prop-types'
import Spinner from '../../../../common/components/spinner'

const EmployeesTable = ({ employees, handleShowUpdateEmployee, handleDeleteEmployee, loading }) => {
  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>usuario</th>
              <th>roles</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td className={styles.username}>
                  {employee.username}
                  <button
                    className={styles.editBtn}
                    onClick={() => handleShowUpdateEmployee(employee)}
                  >
                    editar
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteEmployee(employee)}
                  >
                    X
                  </button>
                </td>
                <td>{employee.roles.map(role => role.name).join(' - ')}</td>
                <td>{employee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && (
        <div className={styles.loading}>
          <Spinner size="sm" /> Eliminando empleado...
        </div>
      )}
    </div>
  )
}

export default EmployeesTable

EmployeesTable.propTypes = {
  employees: propTypes.array,
  handleShowUpdateEmployee: propTypes.func.isRequired,
  handleDeleteEmployee: propTypes.func.isRequired,
  loading: propTypes.bool
}

EmployeesTable.defaultProps = {
  employees: [],
  loading: false
}
