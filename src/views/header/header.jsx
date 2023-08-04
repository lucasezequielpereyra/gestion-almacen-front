import { useEffect, useState } from 'react'
import Header from '../../common/components/header/header'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentRoles } from '../../common/redux/auth/authSlice'
import { logout } from '../../common/redux/auth/authSlice'
import { useLogoutSessionMutation } from '../../common/redux/auth/authApiSlice'

const HeaderView = () => {
  const roles = useSelector(selectCurrentRoles)
  const [isDueño, setIsDueño] = useState(false)
  const [isEncargado, setIsEncargado] = useState(false)
  const dispatch = useDispatch()

  const [logoutSession] = useLogoutSessionMutation()

  const handleLogout = () => {
    dispatch(logout())
    try {
      logoutSession()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (roles) {
      if (roles.includes(process.env.REACT_APP_DUENIO)) {
        setIsDueño(true)
      }
      if (roles.includes(process.env.REACT_APP_ENCARGADO)) {
        setIsEncargado(true)
      }
    }
  }, [roles])

  return <Header isDueño={isDueño} isEncargado={isEncargado} handleLogout={handleLogout} />
}

export default HeaderView
