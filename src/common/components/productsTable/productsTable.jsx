import propTypes from 'prop-types'
import styles from './productsTable.module.scss'
import Form from '../form/'
import AddProductItems from '../../../views/admin/products/components/formItems'

const ProductsTable = ({
  products,
  modal,
  formValues,
  handleModal,
  handleChange,
  handleSubmit,
  msgError,
  categories
}) => {
  return (
    <>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>nombre</th>
              <th>categoria</th>
              <th>stock</th>
              <th>Precio Costo</th>
              <th>Precio Venta</th>
              <th>ean</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className={styles.sku}>
                  {product.sku}
                  <button className={styles.buttonHover} onClick={() => handleModal(product)}>
                    editar
                  </button>
                </td>
                <td>{product.name}</td>
                <td>{product.category ? product.category.name : 'n/a'}</td>
                <td>{product.stock ? product.stock : 'n/a'}</td>
                <td>{product.price_cost}</td>
                <td>{product.price_sale ? product.price_sale : 'n/a'}</td>
                <td>{product.EAN ? product.EAN : 'n/a'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal && (
          <Form
            handleModal={handleModal}
            active={modal}
            handleSubmit={handleSubmit}
            msgError={msgError}
          >
            <AddProductItems
              formValues={formValues}
              handleChange={handleChange}
              categories={categories}
              buttonLabel="Actualizar"
            />
          </Form>
        )}
      </div>
    </>
  )
}

export default ProductsTable

ProductsTable.propTypes = {
  products: propTypes.array.isRequired,
  modal: propTypes.bool.isRequired,
  handleModal: propTypes.func.isRequired,
  formValues: propTypes.object.isRequired,
  handleChange: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  msgError: propTypes.string.isRequired,
  categories: propTypes.array.isRequired
}
