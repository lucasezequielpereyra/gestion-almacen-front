import styles from './spinner.module.scss'
import PropTypes from 'prop-types'

const Spinner = ({ size }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`} />
    </div>
  )
}

export default Spinner

// default props
Spinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl'])
}

Spinner.defaultProps = {
  size: 'md'
}
