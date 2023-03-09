import propTypes from 'prop-types'
import styles from './content.module.scss'

const Content = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}

export default Content

Content.propTypes = {
  children: propTypes.node.isRequired
}
