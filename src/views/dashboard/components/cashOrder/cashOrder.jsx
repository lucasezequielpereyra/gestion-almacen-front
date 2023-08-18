import propTypes from 'prop-types'
import styles from './cashOrder.module.scss'
import { FaArrowLeft } from 'react-icons/fa'
import { FaCircleExclamation } from 'react-icons/fa6'
import { useState, useEffect, useRef } from 'react'

const CashOrder = ({ handleBack, totalOrder }) => {
  const [monto, setMonto] = useState(0)
  const [msg, setMsg] = useState('')
  const [vuelto, setVuelto] = useState(0)

  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()

    if (!monto) return setMsg('El monto es requerido')
    if (monto < 0) return setMsg('El monto debe ser mayor a 0')
    if (isNaN(monto)) return setMsg('El monto debe ser un número')
    if (monto < totalOrder) return setMsg('El monto debe ser mayor al total del pedido')

    setVuelto(monto - totalOrder)
    setMsg('')
  }, [monto])

  const handleChange = e => {
    setMonto(e.target.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleBack}>
          <FaArrowLeft className={styles.icon} /> Volver atrás
        </button>
      </div>
      <div className={styles.content}>
        <h4 className={styles.importe}>Importe del pedido ${totalOrder}</h4>
        <div className={styles.pagoContainer}>
          <label htmlFor="monto">Pago recibido</label>
          <input
            type="number"
            id="monto"
            value={monto}
            onChange={e => handleChange(e)}
            placeholder="Ingrese monto..."
            ref={inputRef}
          />
        </div>
        {msg && (
          <div className={styles.errorMsg}>
            <span>
              <FaCircleExclamation className={styles.icon} /> {msg}
            </span>
          </div>
        )}
        <div className={styles.confirmContainer}>
          {vuelto > 0 && <p>Vuelto: ${vuelto.toFixed(2)} </p>}
          <button>Confrimar</button>
        </div>
      </div>
    </div>
  )
}

export default CashOrder

CashOrder.propTypes = {
  handleBack: propTypes.func.isRequired,
  totalOrder: propTypes.number.isRequired
}
