import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentProducts } from '../../../../common/redux/products/productsSlice'
import { FaCheck } from 'react-icons/fa6'
import styles from './content.module.scss'
import propTypes from 'prop-types'

const Content = ({ inputRef }) => {
  const reduxProds = useSelector(selectCurrentProducts)
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(reduxProds)
  }, [reduxProds])

  return (
    <div className={styles.container}>
      <div className={styles.searchProduct}>
        <input list="products" name="products" placeholder="Busca un producto..." ref={inputRef} />
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
  inputRef: propTypes.object.isRequired
}
