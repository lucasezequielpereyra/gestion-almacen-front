import { useSelector } from 'react-redux'
import {
  selectCurrentRoles,
  selectCurrentToken
} from '../../redux/auth/authSlice'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

const Protected = ({ allowedRoles }) => {
  const roles = useSelector(selectCurrentRoles)
  const token = useSelector(selectCurrentToken)
  const location = useLocation()

  return roles?.find(role => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : token ? (
    <Navigate to="/unauthorized" state={{ from: location }} />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  )
}
export default Protected
