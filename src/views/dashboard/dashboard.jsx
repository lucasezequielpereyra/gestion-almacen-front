import SubHeader from '../../common/components/subHeader'
import Content from './components/content/'
import { useRef, useEffect, useState } from 'react'
import { useUpdateProducts, useUpdateInactiveProducts } from '../../common/hooks/useUpdateProducts'
import { useUpdateCategories } from '../../common/hooks/useUpdateCategories'
import { useSelector } from 'react-redux'
import { selectCurrentProducts } from '../../common/redux/products/productsSlice'
import Modal from '../../common/components/modal'
import ConfirmOrder from './components/confirmOrder'
import CashOrder from './components/cashOrder'
import { usePressEscKey } from '../../common/hooks/usePressEscKey'

const Dashboard = () => {
  useUpdateProducts()
  useUpdateInactiveProducts()
  useUpdateCategories()
  const reduxProds = useSelector(selectCurrentProducts)

  // state hooks
  const [products, setProducts] = useState([])
  const [cartProducts, setCartProducts] = useState([])
  const [msg, setMsg] = useState('')
  const [modalConfirm, setModalConfirm] = useState(false)
  const [modalCash, setModalCash] = useState(false)

  // hook to close modal with esc key
  usePressEscKey(setModalConfirm)

  // refs hooks
  const inputSearchRef = useRef()
  const quantityRef = useRef()
  const modalRef = useRef()
  const modalCashRef = useRef()

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
    if (quantityRef.current.value < 1) {
      setMsg('La cantidad debe ser mayor a 0')
      return quantityRef.current.focus()
    }

    if (isNaN(quantityRef.current.value)) return setMsg('La cantidad debe ser un número')

    if (cartProducts.length === 0) {
      const newProduct = {
        sku: product.sku,
        name: product.name,
        quantity: parseInt(quantityRef.current.value),
        price: product.price_sale
      }
      inputSearchRef.current.value = ''
      quantityRef.current.value = 1
      return setCartProducts([newProduct])
    }

    if (cartProducts.find(prod => prod.sku === product.sku)) {
      const newCartProducts = cartProducts.map(prod => {
        if (prod.sku === product.sku) {
          prod.quantity = parseInt(prod.quantity) + parseInt(quantityRef.current.value)
        }
        return prod
      })
      inputSearchRef.current.value = ''
      quantityRef.current.value = 1
      return setCartProducts(newCartProducts)
    }

    const newProduct = {
      sku: product.sku,
      name: product.name,
      quantity: parseInt(quantityRef.current.value),
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

  const handleReset = () => {
    setCartProducts([])
    setMsg('')
    inputSearchRef.current.value = ''
    quantityRef.current.value = 1
    inputSearchRef.current.focus()
  }

  const handleConfirm = () => {
    if (cartProducts.length === 0) return setMsg('No hay productos en el carrito')
    setModalConfirm(!modalConfirm)
  }

  const handleCash = () => {
    setModalConfirm(false)
    setModalCash(!modalCash)
  }

  const handleBack = setState => {
    setState(false)
    setModalConfirm(true)
  }

  return (
    <div>
      <SubHeader title="Punto de venta" />
      <Content
        inputSearchRef={inputSearchRef}
        quantityRef={quantityRef}
        handleAddProduct={handleAddProduct}
        handleDeleteProduct={handleDeleteProduct}
        msg={msg}
        cartProducts={cartProducts}
        products={products}
        handleReset={handleReset}
        handleConfirm={handleConfirm}
      />
      {modalConfirm && (
        <Modal
          handleModal={handleConfirm}
          modalTitle="Confirmar venta"
          active={modalConfirm}
          modalRef={modalRef}
          size="lg"
        >
          <ConfirmOrder
            products={cartProducts}
            handleCash={handleCash}
            handleClose={handleConfirm}
          />
        </Modal>
      )}
      {modalCash && (
        <Modal
          handleModal={() => handleBack(setModalCash)}
          modalTitle="Pago en efectivo"
          active={modalCash}
          modalRef={modalCashRef}
          size="lg"
        >
          <CashOrder
            handleBack={() => handleBack(setModalCash)}
            totalOrder={cartProducts.reduce(
              (acc, product) => acc + product.price * product.quantity,
              0
            )}
          />
        </Modal>
      )}
    </div>
  )
}

export default Dashboard
