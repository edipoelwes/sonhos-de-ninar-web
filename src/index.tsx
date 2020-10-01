import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import 'bootstrap/dist/css/bootstrap.css'
import './assets/scss/paper-dashboard.scss?v=1.2.0'
import './assets/demo/demo.css'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

ReactDOM.render(
  <Fragment>
    <App />
  </Fragment>,
  document.getElementById('root')
)
