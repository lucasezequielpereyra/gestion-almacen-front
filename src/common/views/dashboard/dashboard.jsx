import { useSelector } from 'react-redux'
import {
  selectCurrentToken,
  selectCurrentUser
} from '../../redux/auth/authSlice'
import Header from '../../components/header/header'

const Dashboard = () => {
  return (
    <div>
      <Header />
    </div>
  )
}

export default Dashboard
