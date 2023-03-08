import { useEffect, useState } from 'react'
import Header from '../../components/header/header'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentRoles } from '../../redux/auth/authSlice'
import { logout } from '../../redux/auth/authSlice'

const HeaderView = () => {
  const roles = useSelector(selectCurrentRoles)
  const [isDueño, setIsDueño] = useState(false)
  const [isEncargado, setIsEncargado] = useState(false)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if (roles) {
      if (roles.includes('63f819a9388888ba95da84e3')) {
        setIsDueño(true)
      }
      if (roles.includes('63f819a9388888ba95da84e2')) {
        setIsEncargado(true)
      }
    }
  }, [roles])

  return <Header isDueño={isDueño} isEncargado={isEncargado} handleLogout={handleLogout} />
}

export default HeaderView
