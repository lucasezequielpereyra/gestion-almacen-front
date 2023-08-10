import styles from './content.module.scss'
import propTypes from 'prop-types'
import { FaCheck } from 'react-icons/fa6'

const Content = ({ products }) => {
  return (
    <div className={styles.container}>
      <div className={styles.searchProduct}>
        <input list="products" name="products" placeholder="Busca un producto..." />
        <datalist id="products">
          {products.map((product, index) => (
            <option key={index} value={product.name} />
          ))}
        </datalist>
        <button>
          <FaCheck className={styles.icon} />
        </button>
      </div>
    </div>
  )
}

export default Content

Content.propTypes = {
  products: propTypes.array.isRequired
}
