import { useSelector } from 'react-redux'
import {
  selectCurrentToken,
  selectCurrentUser
} from '../../redux/auth/authSlice'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      <h3>
        User: {useSelector(selectCurrentUser)} <br />
        Token: {useSelector(selectCurrentToken)}
      </h3>
    </div>
  )
}

export default Dashboard
