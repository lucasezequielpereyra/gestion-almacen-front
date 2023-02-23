import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetRefreshTokenQuery } from '../../redux/auth/refreshApiSlice'
import { login } from '../../redux/auth/authSlice'
import Spinner from '../../components/spinner/spinner'
import styles from './layout.module.scss'

const Layout = () => {
  const dispatch = useDispatch()
  const { data: data, isLoading, isSuccess } = useGetRefreshTokenQuery()

  useEffect(() => {
    if (isSuccess) {
      dispatch(login(data))
    }
  }, [data])

  return (
    <>
      {isLoading ? (
        <div className={styles.loading}>
          Cargando..
          <Spinner size="lg" />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  )
}

export default Layout
