import React from 'react'
import ReactDOM from 'react-dom'
import { css } from '@emotion/react'

const appStyles = css`
  background: green;
`

ReactDOM.render(
  <div css={appStyles}>hello world</div>,
  document.getElementById('app')
)