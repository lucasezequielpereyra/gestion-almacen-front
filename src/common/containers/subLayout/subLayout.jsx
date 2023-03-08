import styles from './subLayout.module.scss'
import propTypes from 'prop-types'

const SubLayout = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}

export default SubLayout

SubLayout.propTypes = {
  children: propTypes.node.isRequired
}
