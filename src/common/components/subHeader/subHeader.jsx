import { useSelector } from 'react-redux'
import {
  selectCurrentUser,
  selectCurrentOrganization,
  selectCurrentRoles
} from '../../redux/auth/authSlice'
import styles from './subHeader.module.scss'
import propTypes from 'prop-types'

const SubHeader = ({ title }) => {
  const userName = useSelector(selectCurrentUser)
  const roles = useSelector(selectCurrentRoles)
  const organization = useSelector(selectCurrentOrganization)
  return (
    <div className={styles.container}>
      <div className={styles.data}>
        <span>
          Usuario logueado: <span className={styles.strong}>{userName}</span>
        </span>
        <span>
          Organización: <span className={styles.strong}>{organization.name}</span>
        </span>
        <span>
          Roles habilitados:{' '}
          <span className={styles.strong}>{roles.map(role => role.name).join(' - ')}</span>
        </span>
      </div>
      <div>
        <h1>{title}</h1>
      </div>
    </div>
  )
}

export default SubHeader

SubHeader.propTypes = {
  title: propTypes.string
}
