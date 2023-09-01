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
    return product.category._id == value && product.name.toLowerCase().includes(searchRefValue)
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

export const handleShowInactiveProducts = (showInactiveProducts, setShowInactiveProducts) => {
  setShowInactiveProducts(!showInactiveProducts)
}
