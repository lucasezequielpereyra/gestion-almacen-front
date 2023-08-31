import { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import Form from '../../../../common/components/form'
import AddCategoryItems from '../components/formItems/addCategoryItems'
import { useNewCategoryMutation } from '../../../../common/redux/categories/categoriesApiSlice'
import { useDispatch } from 'react-redux'
import { newInternalCategory } from '../../../../common/redux/categories/categoriesSlice'

const NewCategory = ({
  handleModal,
  showNewCategory,
  setShowNewCategory,
  formValues,
  setFormValues,
  msgError,
  setMsgError
}) => {
  // states
  const [loading, setLoading] = useState(false)

  // redux actions
  const dispatch = useDispatch()
  const [newCategory, { error: categoryError, status: categoryStatus, data: dataCategory }] =
    useNewCategoryMutation()

  // effect for new category
  useEffect(() => {
    if (categoryStatus === 'pending') {
      setLoading(true)
    }

    if (categoryStatus === 'fulfilled') {
      dispatch(newInternalCategory(dataCategory))
      setFormValues({})
      handleModal(showNewCategory, setMsgError, setFormValues, setShowNewCategory)
      setLoading(false)
    }

    if (categoryStatus === 'rejected') {
      setMsgError(categoryError.data?.error)
      setLoading(false)
    }
  }, [categoryStatus])

  // method for controlled form
  const handleChange = e => {
    const {
      target: { name, value }
    } = e
    setFormValues({ ...formValues, [name]: value })
  }

  // method for submit
  const handleSubmit = e => {
    {
      e.preventDefault()
      try {
        newCategory({
          name: formValues.name,
          description: formValues.description
        })
      } catch (err) {
        setMsgError(err.message)
      }
    }
  }

  return (
    <Form
      handleModal={() =>
        handleModal(showNewCategory, setMsgError, setFormValues, setShowNewCategory)
      }
      active={showNewCategory}
      handleSubmit={handleSubmit}
      msgError={msgError}
      modalTitle="Agregar Categoria"
    >
      <AddCategoryItems
        formValues={formValues}
        handleChange={handleChange}
        buttonLabel="Agregar"
        loading={loading}
      />
    </Form>
  )
}

export default NewCategory

NewCategory.propTypes = {
  handleModal: propTypes.func.isRequired,
  showNewCategory: propTypes.bool.isRequired,
  setShowNewCategory: propTypes.func.isRequired,
  formValues: propTypes.object.isRequired,
  setFormValues: propTypes.func.isRequired,
  msgError: propTypes.string.isRequired,
  setMsgError: propTypes.func.isRequired
}
