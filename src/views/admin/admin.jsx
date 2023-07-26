import Content from '../../common/containers/content'
import Menu from '../../common/components/menu'
import { menuItems } from './menuItems'
import { useLocation } from 'react-router-dom'
import Products from './products'
import { useUpdateProducts } from '../../common/hooks/useUpdateProducts'
import { useUpdateCategories } from '../../common/hooks/useUpdateCategories'

const Admin = () => {
  const location = useLocation()

  useUpdateProducts()
  useUpdateCategories()
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
