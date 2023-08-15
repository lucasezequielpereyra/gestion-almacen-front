import Header from './components/header'
import Content from './components/content/'
import { useRef, useEffect, useState } from 'react'
import { useUpdateProducts, useUpdateInactiveProducts } from '../../common/hooks/useUpdateProducts'
import { useUpdateCategories } from '../../common/hooks/useUpdateCategories'
import { useSelector } from 'react-redux'
import { selectCurrentProducts } from '../../common/redux/products/productsSlice'

const Dashboard = () => {
  useUpdateProducts()
  useUpdateInactiveProducts()
  useUpdateCategories()

  const reduxProds = useSelector(selectCurrentProducts)

  // state hooks
  const [products, setProducts] = useState([])
  const [cartProducts, setCartProducts] = useState([])
  const [msg, setMsg] = useState('')

  // refs hooks
  const inputSearchRef = useRef()
  const quantityRef = useRef()

  // effect hooks
  useEffect(() => {
    inputSearchRef.current.focus()
  }, [inputSearchRef])

  useEffect(() => {
    setProducts(reduxProds)
  }, [reduxProds])

  // handlers
  const handleAddProduct = () => {
    setMsg('')

    const product = reduxProds.find(prod => prod.name === inputSearchRef.current.value)

    if (!product) return setMsg('El producto no existe')
    if (quantityRef.current.value < 1) return setMsg('La cantidad debe ser mayor a 0')

    if (cartProducts.length === 0) {
      const newProduct = {
        name: product.name,
        quantity: quantityRef.current.value,
        price: product.price_sale
      }
      inputSearchRef.current.value = ''
      quantityRef.current.value = 1
      return setCartProducts([newProduct])
    }

    if (cartProducts.find(prod => prod.name === product.name)) {
      const newCartProducts = cartProducts.map(prod => {
        if (prod.name === product.name) {
          prod.quantity = parseInt(prod.quantity) + parseInt(quantityRef.current.value)
        }
        return prod
      })
      inputSearchRef.current.value = ''
      quantityRef.current.value = 1
      return setCartProducts(newCartProducts)
    }

    const newProduct = {
      name: product.name,
      quantity: quantityRef.current.value,
      price: product.price_sale
    }
    inputSearchRef.current.value = ''
    quantityRef.current.value = 1

    setCartProducts([...cartProducts, newProduct])
  }

  const handleDeleteProduct = product => {
    return () => {
      let newCartProducts = cartProducts.filter(prod => prod.name !== product)
      setCartProducts(newCartProducts)
    }
  }

  return (
    <div>
      <Header />
      <Content
        inputSearchRef={inputSearchRef}
        quantityRef={quantityRef}
        handleAddProduct={handleAddProduct}
        handleDeleteProduct={handleDeleteProduct}
        msg={msg}
        cartProducts={cartProducts}
        products={products}
      />
    </div>
  )
}

export default Dashboard
