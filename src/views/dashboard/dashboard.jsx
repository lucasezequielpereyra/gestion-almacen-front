import Header from './components/header'
import Content from './components/content/'
import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentProducts } from '../../common/redux/products/productsSlice'
import { useUpdateProducts } from '../../common/hooks/useUpdateProducts'
import { useUpdateCategories } from '../../common/hooks/useUpdateCategories'

const Dashboard = () => {
  // load products and categories
  useUpdateProducts()
  useUpdateCategories()

  // input search ref
  const inputSearchRef = useRef(null)

  const [products, setProducts] = useState(useSelector(selectCurrentProducts))

  useEffect(() => {
    inputSearchRef.current.focus()
  }, [])

  return (
    <div>
      <Header />
      <Content products={products} inputRef={inputSearchRef} />
    </div>
  )
}

export default Dashboard
