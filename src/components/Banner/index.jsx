import { Body, Title } from './styles'
import { css } from 'styled-components'
import { formatToCss } from '../../utils'

export function Banner({ children, config = {} }) {
  return (
    <Body
      {...{
        styles: css`
          ${formatToCss(config, true)}
        `,
      }}
    >
      <Title>{children}</Title>
    </Body>
  )
}
