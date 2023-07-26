import Content from '../../common/containers/content'
import Menu from '../../common/components/menu'
import { menuItems } from './menuItems'
import { useLocation } from 'react-router-dom'
import { useUpdateProducts } from '../../common/hooks/useUpdateProducts'
import { useUpdateCategories } from '../../common/hooks/useUpdateCategories'
import Products from './products'

const Admin = () => {
  useUpdateProducts()
  useUpdateCategories()
  const location = useLocation()

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
