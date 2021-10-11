import React from 'react'
import ReactDOM from 'react-dom'
import { Global, css } from '@emotion/react'
import App from './components/App'

const globalStyles = css`
  body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }
`

ReactDOM.render(
  <>
    <App />
    <Global styles={globalStyles} />
  </>,
  document.getElementById('app')
)