import propTypes from 'prop-types'
import styles from './productsTable.module.scss'
import Form from '../../../../../common/components/form/form'
import AddProductItems from '../formItems/addProductItems'
import Spinner from '../../../../../common/components/spinner/spinner'

const ProductsTable = ({
  products,
  modalEdit,
  formValues,
  handleChange,
  handleSubmit,
  msgError,
  categories,
  handleModalEdit,
  handleModalDelete,
  handleDelete,
  modalDelete,
  loading
}) => {
  return (
    <div className={styles.container}>
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
                  <button className={styles.editBtn} onClick={() => handleModalEdit(product)}>
                    editar
                  </button>
                  <button className={styles.deleteBtn} onClick={() => handleModalDelete(product)}>
                    X
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
      </div>
      {modalEdit && (
        <Form
          handleModal={handleModalEdit}
          active={modalEdit}
          handleSubmit={handleSubmit}
          msgError={msgError}
          modalTitle="Editar Producto"
        >
          <AddProductItems
            formValues={formValues}
            handleChange={handleChange}
            categories={categories}
            buttonLabel="Actualizar"
            loading={loading}
          />
        </Form>
      )}
      {modalDelete && (
        <Form
          handleModal={handleModalDelete}
          active={modalDelete}
          handleSubmit={handleDelete}
          msgError={msgError}
          modalTitle="Eliminar Producto"
        >
          <div className={styles.formDelete}>
            <p>
              ¿Estas seguro que deseas eliminar el producto <strong>{formValues.name}</strong>?
            </p>
            <button type="submit">{loading && <Spinner size="sm" />} eliminar</button>
          </div>
        </Form>
      )}
    </div>
  )
}

export default ProductsTable

ProductsTable.propTypes = {
  products: propTypes.array.isRequired,
  modalEdit: propTypes.bool.isRequired,
  handleDelete: propTypes.func.isRequired,
  formValues: propTypes.object.isRequired,
  handleChange: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  msgError: propTypes.string.isRequired,
  categories: propTypes.array.isRequired,
  handleModalEdit: propTypes.func.isRequired,
  handleModalDelete: propTypes.func.isRequired,
  handleDelete: propTypes.func.isRequired,
  modalDelete: propTypes.bool.isRequired,
  loading: propTypes.bool.isRequired
}
