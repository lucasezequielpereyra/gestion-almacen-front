import React from 'react'
import styles from './formLogin.module.scss'

const FormLogin = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ingrese al sistema</h1>
      <div className={styles.login}>
        <div className={styles.form}>
          <div className={styles.input}>
            <input type="text" placeholder="Username" />
          </div>
          <div className={styles.input}>
            <input type="password" placeholder="Password" />
          </div>
          <div className={styles.button}>
            <button>Ingresar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormLogin
