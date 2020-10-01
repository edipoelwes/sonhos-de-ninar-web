import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'

const PublicRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth()

  return (
    <Route {...rest} render={props => (
      !user ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/admin/dashboard' }} />
      )
    )}/>
  )
}

export default PublicRoute
