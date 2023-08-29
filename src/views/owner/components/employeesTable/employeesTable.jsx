import styles from './employeesTable.module.scss'
import propTypes from 'prop-types'

const EmployeesTable = ({ employees, handleShowUpdateEmployee }) => {
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
                  <button className={styles.deleteBtn} onClick={() => handleModalDelete(product)}>
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
    </div>
  )
}

export default EmployeesTable

EmployeesTable.propTypes = {
  employees: propTypes.array,
  handleShowUpdateEmployee: propTypes.func.isRequired
}

EmployeesTable.defaultProps = {
  employees: []
}
