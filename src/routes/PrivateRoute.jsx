import React from 'react'

import { Route as RouteDomRender, Redirect } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth()

  return (
    <RouteDomRender {...rest} render={props => (
      user ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/' }} />
      )
    )}/>
  )
}

export default PrivateRoute
