export const handleChangeSearch = (e, products, categoryRef, setProductsFiltered) => {
  const {
    target: { value }
  } = e
  const copyProducts = [...products]
  const search = value.toLowerCase()
  const categorySearch = categoryRef.current.value

  const productsFiltered = copyProducts.filter(product => {
    const name = product.name.toLowerCase()
    return name.includes(search)
  })
  setProductsFiltered(productsFiltered)

  if (categorySearch != '0') {
    const category = categorySearch
    const productsFilteredByCategory = productsFiltered.filter(product => {
      return product.category._id == category
    })
    setProductsFiltered(productsFilteredByCategory)
  }
}

export const handleChangeCategory = (e, products, searchRef, setProductsFiltered) => {
  const {
    target: { value }
  } = e

  const copyProducts = [...products]
  const searchRefValue = searchRef.current.value.toLowerCase()

  if (value == '0') {
    const productsFiltered = copyProducts.filter(product => {
      const name = product.name.toLowerCase()
      return name.includes(searchRefValue)
    })
    return setProductsFiltered(productsFiltered)
  }

  const productsFiltered = copyProducts.filter(product => {
    return product.category._id == value
  })
  setProductsFiltered(productsFiltered)
}

export const handleShow = (show, setMsgError, setFormValues, setShow) => {
  if (show) {
    setMsgError('')
    setFormValues({})
  }
  setShow(!show)
}

export const handleChange = (e, formValues, setFormValues) => {
  const {
    target: { name, value }
  } = e
  setFormValues({ ...formValues, [name]: value })
}

export const handleProductSubmit = (e, newProduct, formValues, setMsgError) => {
  e.preventDefault()
  try {
    newProduct({
      sku: formValues.sku,
      name: formValues.name,
      category: formValues.category,
      description: formValues.description,
      EAN: formValues.EAN,
      price_cost: formValues.price_cost,
      price_sale: formValues.price_sale,
      stock: formValues.stock
    }).unwrap()
  } catch (err) {
    setMsgError(err.message)
  }
}

export const handleCategorySubmit = (e, newCategory, formValues, setMsgCategoryError) => {
  e.preventDefault()
  try {
    newCategory({
      name: formValues.name,
      description: formValues.description
    }).unwrap()
  } catch (err) {
    setMsgCategoryError(err.message)
  }
}
