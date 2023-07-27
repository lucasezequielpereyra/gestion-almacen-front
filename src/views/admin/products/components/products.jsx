import styles from './products.module.scss'
import propTypes from 'prop-types'
import ProductsList from '../productsList/productsList'
import Form from '../../../../common/components/form/form'
import AddProductItems from './formItems/addProductItems'
import AddCategoryItems from './formItems/addCategoryItems'

const ProductsComponent = ({
  handleShow,
  showNewProduct,
  setMsgError,
  setFormValues,
  setShowNewProduct,
  showNewCategory,
  setMsgCategoryError,
  setShowNewCategory,
  handleChangeSearch,
  handleChangeCategory,
  products,
  categoryRef,
  setProductsFiltered,
  searchRef,
  categoriesFiltred,
  productsFiltered,
  newProduct,
  newCategory,
  formValues,
  msgError,
  msgCategoryError,
  handleChange,
  handleProductSubmit,
  handleCategorySubmit
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <button
          className={styles.buttonAdd}
          onClick={() => handleShow(showNewProduct, setMsgError, setFormValues, setShowNewProduct)}
        >
          Nuevo Producto
        </button>
        <button
          className={styles.buttonAdd}
          onClick={() =>
            handleShow(showNewCategory, setMsgCategoryError, setFormValues, setShowNewCategory)
          }
        >
          Nueva Categoria
        </button>
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
              {categoriesFiltred.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <ProductsList products={productsFiltered} />
      </div>
      {showNewProduct && (
        <Form
          handleModal={() =>
            handleShow(showNewProduct, setMsgError, setFormValues, setShowNewProduct)
          }
          active={Boolean(showNewProduct)}
          handleSubmit={e => handleProductSubmit(e, newProduct, formValues, setMsgError)}
          msgError={msgError}
          modalTitle="Agregar Producto"
        >
          <AddProductItems
            formValues={formValues}
            handleChange={e => handleChange(e, formValues, setFormValues)}
            categories={categoriesFiltred}
            buttonLabel="Agregar"
          />
        </Form>
      )}
      {showNewCategory && (
        <Form
          handleModal={() =>
            handleShow(showNewCategory, setMsgCategoryError, setFormValues, setShowNewCategory)
          }
          modalTitle="Agregar Categoria"
          active={Boolean(showNewCategory)}
          msgError={msgCategoryError}
          handleSubmit={e => handleCategorySubmit(e, newCategory, formValues, setMsgCategoryError)}
        >
          <AddCategoryItems
            formValues={formValues}
            handleChange={e => handleChange(e, formValues, setFormValues)}
            buttonLabel="Agregar"
          />
        </Form>
      )}
    </div>
  )
}

export default ProductsComponent

ProductsComponent.propTypes = {
  handleShow: propTypes.func.isRequired,
  showNewProduct: propTypes.bool.isRequired,
  setMsgError: propTypes.func.isRequired,
  setFormValues: propTypes.func.isRequired,
  setShowNewProduct: propTypes.func.isRequired,
  showNewCategory: propTypes.bool.isRequired,
  setMsgCategoryError: propTypes.func.isRequired,
  setShowNewCategory: propTypes.func.isRequired,
  handleChangeSearch: propTypes.func.isRequired,
  handleChangeCategory: propTypes.func.isRequired,
  products: propTypes.array.isRequired,
  categoryRef: propTypes.object.isRequired,
  setProductsFiltered: propTypes.func.isRequired,
  categoryRef: propTypes.object.isRequired,
  categoriesFiltered: propTypes.array.isRequired,
  productsFiltered: propTypes.array.isRequired,
  newProduct: propTypes.func.isRequired,
  newCategory: propTypes.func.isRequired,
  formValues: propTypes.object.isRequired,
  msgError: propTypes.string.isRequired,
  msgCategoryError: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
  handleProductSubmit: propTypes.func.isRequired,
  handleCategorySubmit: propTypes.func.isRequired
}