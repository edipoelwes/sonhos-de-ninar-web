import React, { createContext, useCallback, useContext, useState } from 'react'
import api from '../services/api'

interface AuthState {
  token: string
  user: object
}
interface SignInCredencials {
  email: string
  password: string
}

interface AuthContextData {
  user: object
  signIn(credencials: SignInCredencials): Promise<void>
  signOut(): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@SonhosDeNinar:token')
    const user = localStorage.getItem('@SonhosDeNinar:user')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }
    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/auth/login', {
      email,
      password
    })

    const token = response.data.token
    const user = response.data.user

    localStorage.setItem('@SonhosDeNinar:token', token)
    localStorage.setItem('@SonhosDeNinar:user', JSON.stringify(user))

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@SonhosDeNinar:token')
    localStorage.removeItem('@SonhosDeNinar:user')

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      { children }
    </AuthContext.Provider>
  )
}

export function useAuth (): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
