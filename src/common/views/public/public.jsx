import { useEffect, useRef, useState } from 'react'
import FormLogin from '../../components/formLogin'
import { selectCurrentToken } from '../../redux/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/auth/authSlice'
import { useLoginMutation } from '../../redux/auth/authApiSlice'
import { useNavigate } from 'react-router-dom'

const Public = () => {
  const token = useSelector(selectCurrentToken)
  const navigate = useNavigate()

  // for redux
  const dispatch = useDispatch()
  const [auth, { isLoading }] = useLoginMutation()

  // for form
  const userRef = useRef()
  const errRef = useRef()
  const [userbame, setUser] = useState('')
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
  }, [userbame, passowrd])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const userData = await auth({
        username: userbame,
        password: passowrd
      }).unwrap()
      console.log(userData)

      dispatch(login(...userData, userbame))
      setUser('')
      setPassword('')
      navigate('/dashboard')
    } catch (err) {
      if (!err.status) {
        setErr('No Server Response !')
      } else if (err.status === 400) {
        setErr('Missing Username or Password !')
      } else if (err.status === 401) {
        setErr('Unauthorized !')
      } else {
        setErr('Login Failed !')
      }
      userRef.current.focus()
    }
  }

  const handleUserInput = e => setUser(e.target.value)
  const handlePwdInput = e => setPassword(e.target.value)

  return (
    <FormLogin
      userRef={userRef}
      errRef={errRef}
      errMsg={err}
      user={userbame}
      passowrd={passowrd}
      handleSubmit={handleSubmit}
      handleUserInput={handleUserInput}
      handlePwdInput={handlePwdInput}
    />
  )
}

export default Public
