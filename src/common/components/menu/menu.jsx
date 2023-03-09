import styles from './menu.module.scss'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Menu = ({ items }) => {
  return (
    <div className={styles.container}>
      <ul>
        {items.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.url} className={styles.underline}>
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Menu

Menu.propTypes = {
  items: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string.isRequired,
      url: propTypes.string.isRequired
    })
  ).isRequired
}
