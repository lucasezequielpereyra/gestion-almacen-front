import styles from './products.module.scss'
import propTypes from 'prop-types'
import ProductsList from '../productsList/productsList'
import Form from '../../../../common/components/form/form'
import AddProductItems from './formItems/addProductItems'
import AddCategoryItems from './formItems/addCategoryItems'
import InactiveProducts from '../inactiveProducts/inactiveProducts'
import Button from '../../../../common/components/button'
import { useSelector } from 'react-redux'
import { selectCurrentCategories } from '../../../../common/redux/categories/categoriesSlice'

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
  productsFiltered,
  newProduct,
  newCategory,
  formValues,
  msgError,
  msgCategoryError,
  handleChange,
  handleProductSubmit,
  handleCategorySubmit,
  handleShowInactiveProducts,
  showInactiveProducts,
  setShowInactiveProducts,
  loading
}) => {
  const categories = useSelector(selectCurrentCategories)
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
            buttonLabel="Agregar"
            loading={loading}
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
            loading={loading}
          />
        </Form>
      )}
      {showInactiveProducts && (
        <InactiveProducts
          handleShow={handleShowInactiveProducts}
          show={showInactiveProducts}
          setShow={setShowInactiveProducts}
        />
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
  productsFiltered: propTypes.array.isRequired,
  newProduct: propTypes.func.isRequired,
  newCategory: propTypes.func.isRequired,
  formValues: propTypes.object.isRequired,
  msgError: propTypes.string.isRequired,
  msgCategoryError: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
  handleProductSubmit: propTypes.func.isRequired,
  handleCategorySubmit: propTypes.func.isRequired,
  handleShowInactiveProducts: propTypes.func.isRequired,
  showInactiveProducts: propTypes.bool.isRequired,
  setShowInactiveProducts: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired
}
