import styles from './inactiveTable.module.scss'
import propTypes from 'prop-types'
import Spinner from '../../../../common/components/spinner'
import { FaCheck } from 'react-icons/fa'

const InactiveTable = ({ employees, handleActiveEmployee, loading }) => {
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
                    className={styles.activeBtn}
                    onClick={() => handleActiveEmployee(employee)}
                  >
                    <FaCheck />
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
          <Spinner size="sm" /> Activando empleado...
        </div>
      )}
    </div>
  )
}

export default InactiveTable

InactiveTable.propTypes = {
  employees: propTypes.array,
  handleActiveEmployee: propTypes.func.isRequired,
  loading: propTypes.bool
}

InactiveTable.defaultProps = {
  employees: [],
  loading: false
}
