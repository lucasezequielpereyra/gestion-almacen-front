import styles from './employeesTable.module.scss'
import propTypes from 'prop-types'

const EmployeesTable = ({ employees }) => {
  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>user</th>
              <th>roles</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.username}</td>
                <td>{employee.roles.map(role => role.name).join(' - ')}</td>
                <td>{employee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeesTable

EmployeesTable.propTypes = {
  employees: propTypes.array
}

EmployeesTable.defaultProps = {
  employees: []
}
