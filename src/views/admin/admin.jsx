import Content from '../../common/containers/content'
import Menu from '../../common/components/menu'
import { menuItems } from './menuItems'
import { useLocation } from 'react-router-dom'
import { useUpdateInactiveProducts } from '../../common/hooks/useUpdateProducts'
import Products from './products'
import SubHeader from '../../common/components/subHeader'

const Admin = () => {
  useUpdateInactiveProducts()
  const location = useLocation()

  return (
    <div>
      <Content>
        <Menu items={menuItems} />
        <SubHeader title="Panel de Administracion" />
        {location.pathname === '/admin/productos' && <Products />}
      </Content>
    </div>
  )
}

export default Admin
