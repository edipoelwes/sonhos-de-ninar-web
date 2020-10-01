import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './hooks/AuthContext'
import Routes from './routes'

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  )
}

export default App
