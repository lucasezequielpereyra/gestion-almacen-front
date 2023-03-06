import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../redux/auth/authSlice'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

const Protected = () => {
  const token = useSelector(selectCurrentToken)
  const location = useLocation()

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
export default Protected
