import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div>
      <h1>Criar Conta</h1>

      <Link to="/" className="register-login-form">
        <i className="nc-icon nc-lock-circle-open" />
        login
      </Link>

    </div>
  )
}

export default SignUp
