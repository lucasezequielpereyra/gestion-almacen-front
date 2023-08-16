import { useState } from 'react'
import propTypes from 'prop-types'
import classNames from 'class-names'
import styles from './modal.module.scss'

const Modal = ({ handleModal, children, modalTitle, active, modalRef, className, size }) => {
  const [modal] = useState(active)

  const modalClass = classNames(styles.container, className, {
    [styles.active]: modal
  })

  const modalSize = classNames(styles.modal, {
    [styles.sm]: size === 'sm',
    [styles.md]: size === 'md',
    [styles.lg]: size === 'lg'
  })

  return (
    <div className={modalClass}>
      <div className={modalSize} ref={modalRef}>
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
  className: propTypes.string,
  size: propTypes.oneOf(['sm', 'md', 'lg'])
}

Modal.defaultProps = {
  children: null,
  modalTitle: 'Modal',
  size: 'sm'
}
