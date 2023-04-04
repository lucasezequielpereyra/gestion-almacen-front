import { useEffect, useRef, useState } from 'react'
import FormLogin from '../../common/components/formLogin'
import { selectCurrentToken } from '../../common/redux/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../common/redux/auth/authSlice'
import { useLoginMutation } from '../../common/redux/auth/authApiSlice'
import { useNavigate } from 'react-router-dom'

const Public = () => {
  const token = useSelector(selectCurrentToken)
  const navigate = useNavigate()

  // for redux
  const dispatch = useDispatch()
  const [auth] = useLoginMutation()

  // for form
  const userRef = useRef()
  const errRef = useRef()
  const [username, setUser] = useState('')
  const [err, setErr] = useState('')
  const [passowrd, setPassword] = useState('')

  useEffect(() => {
    if (token) {
      return navigate('/dashboard')
    }
  }, [token])

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErr('')
  }, [username, passowrd])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const userData = await auth({
        username: username,
        password: passowrd
      }).unwrap()

      dispatch(login(userData))
      setUser('')
      setPassword('')
      navigate('/dashboard')
    } catch (err) {
      if (!err.originalStatus) {
        setErr('Network Error')
      } else if (err.originalStatus === 400) {
        setErr('Missing Username or Password')
      } else if (err.originalStatus === 401) {
        setErr('Unauthorized')
      } else {
        setErr('Login Failed')
      }
      errRef.current.focus()
    }
  }

  const handleUserInput = e => setUser(e.target.value)
  const handlePwdInput = e => setPassword(e.target.value)

  return (
    <FormLogin
      userRef={userRef}
      errRef={errRef}
      errMsg={err}
      user={username}
      passowrd={passowrd}
      handleSubmit={handleSubmit}
      handleUserInput={handleUserInput}
      handlePwdInput={handlePwdInput}
    />
  )
}

export default Public
