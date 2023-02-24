import styles from './header.module.scss'
import { useState, useRef } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import { usePressEscKey } from '../../hooks/usePressEscKey'
import { Link } from 'react-router-dom'
import { MdOutlineMenu } from 'react-icons/md'
import classNames from 'class-names'
import PropTypes from 'prop-types'

const Header = ({ isAdmin }) => {
  const [showMenuMobile, setShowMenuMobile] = useState(false)

  const handleShowMenuMobile = () => {
    setShowMenuMobile(!showMenuMobile)
  }

  const navRef = useRef()

  // Hook for closing the menu when clicking outside of it
  useClickOutside(navRef, () => {
    setShowMenuMobile(false)
  })

  // Hook for closing the menu when clicking the ESC key
  usePressEscKey(() => {
    setShowMenuMobile(false)
  })

  const navClass = classNames(styles.nav, {
    [styles.navMobile]: showMenuMobile
  })

  return (
    <div className={styles.container}>
      <button className={styles.buttonMobile} onClick={handleShowMenuMobile}>
        <MdOutlineMenu className={styles.mobileIcon} />
      </button>
      <div className={navClass} ref={navRef}>
        <div className={styles.navItem}>
          <Link to="#">Inicio</Link>
        </div>
        {isAdmin && (
          <div className={styles.navItem}>
            <Link to="#">Administración</Link>
          </div>
        )}
      </div>
      <h1>Sistema Gestión</h1>
    </div>
  )
}

export default Header

Header.propTypes = {
  isAdmin: PropTypes.bool
}

Header.defaultProps = {
  isAdmin: false
}
