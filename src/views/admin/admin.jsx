import { useEffect } from 'react'
import Content from '../../common/containers/content'
import Menu from '../../common/components/menu'
import { menuItems } from './menuItems'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProducts } from '../../common/redux/products/productsSlice'
import { useGetProductsQuery } from '../../common/redux/products/productsApiSlice'
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
