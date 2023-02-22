import React from 'react'
import styles from './formLogin.module.scss'

const FormLogin = ({
  userRef,
  errRef,
  errMsg,
  user,
  passowrd,
  handleSubmit,
  handleUserInput,
  handlePwdInput
}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ingrese al sistema</h1>
      <div className={styles.login}>
        <div className={styles.form}>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Username"
              ref={userRef}
              id="username"
              onChange={handleUserInput}
              autoComplete="off"
              value={user}
              required
            />
          </div>
          <div className={styles.input}>
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handlePwdInput}
              value={passowrd}
              required
            />
          </div>
          <div className={styles.button}>
            <button onClick={handleSubmit}>Ingresar</button>
          </div>
        </div>
      </div>
      <p className={styles.errMsg} ref={errRef}>
        {errMsg}
      </p>
    </div>
  )
}

export default FormLogin
