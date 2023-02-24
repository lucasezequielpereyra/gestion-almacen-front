import { useEffect } from 'react'

export const usePressEscKey = setState => {
  useEffect(() => {
    const handleClickEscKey = e => {
      if (e.key === 'Escape') {
        setState(false)
      }
    }

    document.addEventListener('keydown', handleClickEscKey)
    return () => {
      document.removeEventListener('keydown', handleClickEscKey)
    }
  }, [setState])
}
