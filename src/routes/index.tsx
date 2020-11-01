import React from 'react'
import { Switch } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

import Auth from '../layouts/Auth'
import AdminLayout from '../layouts/Admin.js'
import SignUp from '../views/pages/SignUp'

const Routes: React.FC = () => {
  return (
    <Switch>
      <PublicRoute path="/" exact component={Auth} />
      <PublicRoute path="/signup" component={SignUp} />
      <PrivateRoute path="/admin" component={AdminLayout} />
    </Switch>
  )
}

export default Routes
