import { useState } from 'react'
import propTypes from 'prop-types'
import classNames from 'class-names'
import styles from './modal.module.scss'

const Modal = ({ handleModal, children, modalTitle, active, modalRef, className }) => {
  const [modal] = useState(active)

  const modalClass = classNames(styles.container, className, {
    [styles.active]: modal
  })

  return (
    <div className={modalClass}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{modalTitle}</h3>
          <button className={styles.closeButton} onClick={handleModal}>
            x
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  )
}

export default Modal

Modal.propTypes = {
  active: propTypes.bool.isRequired,
  handleModal: propTypes.func.isRequired,
  children: propTypes.node,
  modalTitle: propTypes.string,
  active: propTypes.bool.isRequired,
  modalRef: propTypes.object,
  className: propTypes.string
}

Modal.defaultProps = {
  children: null,
  modalTitle: 'Modal'
}
