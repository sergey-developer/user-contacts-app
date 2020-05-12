import React, {createContext, useContext, useState} from 'react'

import AuthService from '../services/AuthService'

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(() => AuthService.getUserFromStorage())
  const isAuthenticated = !!user

  const login = async (email, password) => {
    const user = await AuthService.signIn(email, password)
    setUser(user)
  }
  const logout = async () => {
    await AuthService.signOut()
    setUser(null)
  }

  return(
    <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export {useAuth}
export default AuthProvider