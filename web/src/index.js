import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App'
import './index.css'

const options = {
  position: 'top center',
  timeout: 2500,
  offset: '8px',
  transition: 'scale',
}

const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
