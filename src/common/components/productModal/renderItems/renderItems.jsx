import propTypes from 'prop-types'
import styles from './renderItems.module.scss'

const RenderItems = ({ product }) => {
  return (
    <>
      {product.map((item, index) => {
        return (
          <div className={styles.item} key={index}>
            {item[0] !== '_id' &&
              item[0] !== '__v' &&
              item[0] !== 'organization' &&
              item[0] !== 'category' && (
                <>
                  <label htmlFor="">{item[0]}:</label>
                  <input type="text" defaultValue={item[1]} />
                </>
              )}
            {item[0] === 'category' && (
              <>
                <label htmlFor="">{item[0]}:</label>
                <input type="text" defaultValue={item[1]['name']} />
              </>
            )}
          </div>
        )
      })}
    </>
  )
}

export default RenderItems

RenderItems.propTypes = {
  product: propTypes.array.isRequired
}
