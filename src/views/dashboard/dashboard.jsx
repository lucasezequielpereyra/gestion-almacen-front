import Header from './components/header'
import Content from './components/content/'
import { useRef, useEffect } from 'react'
import { useUpdateProducts, useUpdateInactiveProducts } from '../../common/hooks/useUpdateProducts'
import { useUpdateCategories } from '../../common/hooks/useUpdateCategories'

const Dashboard = () => {
  useUpdateProducts()
  useUpdateInactiveProducts()
  useUpdateCategories()

  // input search ref
  const inputSearchRef = useRef(null)

  useEffect(() => {
    inputSearchRef.current.focus()
  }, [])

  useEffect(() => {}, [])

  return (
    <div>
      <Header />
      <Content inputRef={inputSearchRef} />
    </div>
  )
}

export default Dashboard
