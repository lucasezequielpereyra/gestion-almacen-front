import HeaderView from '../header/header'
import Content from '../../containers/content'
import Menu from '../../components/menu'
import { menuItems } from './menuItems'

const Admin = () => {
  return (
    <div>
      <HeaderView />
      <Content>
        <Menu items={menuItems} />
        <h1>Admin</h1>
      </Content>
    </div>
  )
}

export default Admin
