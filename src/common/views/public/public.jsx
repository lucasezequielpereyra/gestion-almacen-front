import { useEffect } from 'react'
import FormLogin from '../../components/formLogin'
import { selectCurrentToken } from '../../redux/auth/authSlice'
import { Navigate } from 'react-router-dom'

const Public = () => {
  return <FormLogin />
}

export default Public
