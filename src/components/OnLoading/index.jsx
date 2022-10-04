import { useEffect } from 'react'
import { Container } from './styles'

export function OnLoading({
  children,
  loading,
  reset,
  delay = 3000,
  contain = 'Loading',
  component,
}) {
  useEffect(() => {
    if (reset)
      setTimeout(() => {
        reset()
      }, delay)
  })

  return loading ? (
    <Container {...{ component }}>{contain || children}</Container>
  ) : null
}
