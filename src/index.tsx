import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, Redirect } from 'react-router-dom'

// import AuthLayout from './layouts/Auth.js'
import App from './App'
import AdminLayout from './layouts/Admin.js'

import 'bootstrap/dist/css/bootstrap.css'
import './assets/scss/paper-dashboard.scss?v=1.2.0'
import './assets/demo/demo.css'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

const hist = createBrowserHistory()

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" component={App} />
      <Route path="/admin" component={AdminLayout} />
      {/* <Route path="/auth" render={(props: any) => <AuthLayout {...props} />} /> */}
      {/* <Route path="/admin" render={(props: any) => <AdminLayout {...props} />} /> */}
      <Redirect to="/admin/dashboard" />
    </Switch>
  </Router>,
  document.getElementById('root')
)
