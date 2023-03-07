import { useEffect, useState } from 'react'
import Header from '../../components/header/header'
import { useSelector } from 'react-redux'
import { selectCurrentRoles } from '../../redux/auth/authSlice'

const HeaderView = () => {
  const roles = useSelector(selectCurrentRoles)
  const [isDueño, setIsDueño] = useState(false)
  const [isEncargado, setIsEncargado] = useState(false)

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

  return <Header isDueño={isDueño} isEncargado={isEncargado} />
}

export default HeaderView
