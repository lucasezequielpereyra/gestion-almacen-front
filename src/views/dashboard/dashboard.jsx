import Header from './components/header'
import Content from './components/content/'
import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentProducts } from '../../common/redux/products/productsSlice'
import { useUpdateProducts } from '../../common/hooks/useUpdateProducts'
import { useUpdateCategories } from '../../common/hooks/useUpdateCategories'

const Dashboard = () => {
  // load products and categories
  useUpdateProducts()
  useUpdateCategories()

  const [products, setProducts] = useState(useSelector(selectCurrentProducts))

  return (
    <div>
      <Header />
      <Content products={products} />
    </div>
  )
}

export default Dashboard
