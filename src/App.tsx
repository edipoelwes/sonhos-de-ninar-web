import React from 'react'

import SignIn from './views/pages/SignIn'
import { AuthProvider } from './hooks/AuthContext'

const App = () => {
  return (
    <>
      <div className="full-page section-image">
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </div>
    </>
  )
}

export default App
