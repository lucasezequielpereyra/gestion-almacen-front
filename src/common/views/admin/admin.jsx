import { useEffect } from 'react'
import Content from '../../containers/content'
import Menu from '../../components/menu'
import { menuItems } from './menuItems'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProducts } from '../../redux/products/productsSlice'
import { useGetProductsQuery } from '../../redux/products/productsApiSlice'
import Products from './products'

const Admin = () => {
  const dispatch = useDispatch()
  const { data: data, isSuccess } = useGetProductsQuery()
  const location = useLocation()

  useEffect(() => {
    if (isSuccess) {
      dispatch(getProducts(data))
    }
  }, [data])

  return (
    <div>
      <Content>
        <Menu items={menuItems} />
        {location.pathname === '/admin/productos' && <Products />}
      </Content>
    </div>
  )
}

export default Admin
