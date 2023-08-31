import propTypes from 'prop-types'
import styles from './button.module.scss'
import classNames from 'classnames'

const Button = ({
  children,
  color,
  size,
  onClick,
  disabled,
  className,
  type,
  block,
  uppercase
}) => {
  const buttonClass = classNames(`${className} ${styles[color]} ${styles.button}`, {
    [styles.md]: size === 'md',
    [styles.lg]: size === 'lg',
    [styles.block]: block,
    [styles.uppercase]: uppercase
  })

  return (
    <button className={buttonClass} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  )
}

export default Button

Button.propTypes = {
  children: propTypes.node.isRequired,
  color: propTypes.oneOf([
    'primary',
    'primary-light',
    'secondary',
    'secondary-light',
    'primary-variant',
    'primary-variant-light',
    'dark',
    'white'
  ]),
  size: propTypes.oneOf(['md', 'lg']),
  onClick: propTypes.func,
  disabled: propTypes.bool,
  type: propTypes.oneOf(['button', 'submit', 'reset']),
  block: propTypes.bool,
  uppercase: propTypes.bool
}

Button.defaultProps = {
  color: 'primary',
  disabled: false,
  size: 'md',
  type: 'button',
  block: false,
  uppercase: false,
  onClick: () => {
    null
  }
}
