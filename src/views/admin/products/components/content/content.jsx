import Button from '../../../../../common/components/button'
import ProductsList from '../../productsList/productsList'
import propTypes from 'prop-types'
import styles from './content.module.scss'

const Content = ({
  handleShow,
  handleShowInactiveProducts,
  handleChangeSearch,
  searchRef,
  handleChangeCategory,
  categoryRef,
  categories,
  productsFiltered,
  products,
  showNewProduct,
  setMsgError,
  setFormValues,
  setShowNewProduct,
  showNewCategory,
  setMsgCategoryError,
  setShowNewCategory,
  showInactiveProducts,
  setShowInactiveProducts,
  setProductsFiltered
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Button
          className={styles.buttonAdd}
          onClick={() => handleShow(showNewProduct, setMsgError, setFormValues, setShowNewProduct)}
          color="secondary"
        >
          Nuevo Producto
        </Button>
        <Button
          className={styles.buttonAdd}
          onClick={() =>
            handleShow(showNewCategory, setMsgCategoryError, setFormValues, setShowNewCategory)
          }
          color="secondary"
        >
          Nueva Categoria
        </Button>
        <Button
          className={styles.buttonAdd}
          onClick={() => handleShowInactiveProducts(showInactiveProducts, setShowInactiveProducts)}
          color="secondary"
        >
          Ver Productos Inactivos
        </Button>
      </div>
      <div className={styles.content}>
        <h1>Lista de Productos</h1>
        <div className={styles.filterContainer}>
          <input
            type="text"
            placeholder="Buscar por nombre"
            onChange={e => handleChangeSearch(e, products, categoryRef, setProductsFiltered)}
            ref={searchRef}
          />
          <div className={styles.filterCategory}>
            <select
              onChange={e => handleChangeCategory(e, products, searchRef, setProductsFiltered)}
              ref={categoryRef}
            >
              <option value="0">Todas las categorias</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <ProductsList products={productsFiltered} />
      </div>
    </div>
  )
}

export default Content

Content.propTypes = {
  handleShow: propTypes.func.isRequired,
  handleShowInactiveProducts: propTypes.func.isRequired,
  handleChangeSearch: propTypes.func.isRequired,
  searchRef: propTypes.object.isRequired,
  handleChangeCategory: propTypes.func.isRequired,
  categoryRef: propTypes.object.isRequired,
  categories: propTypes.array.isRequired,
  productsFiltered: propTypes.array.isRequired,
  products: propTypes.array.isRequired,
  showNewProduct: propTypes.bool.isRequired,
  setMsgError: propTypes.func.isRequired,
  setFormValues: propTypes.func.isRequired,
  setShowNewProduct: propTypes.func.isRequired,
  showNewCategory: propTypes.bool.isRequired,
  setMsgCategoryError: propTypes.func.isRequired,
  setShowNewCategory: propTypes.func.isRequired,
  showInactiveProducts: propTypes.bool.isRequired,
  setShowInactiveProducts: propTypes.func.isRequired,
  setProductsFiltered: propTypes.func.isRequired
}
