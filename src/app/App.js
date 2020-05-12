import React from 'react'

import Routes from './Routes'
import ErrorBoundary from '../shared/components/ErrorBoundary'
import AuthProvider from '../shared/context/AuthContext'

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <AuthProvider>
          <Routes/>
        </AuthProvider>
      </ErrorBoundary>
    </div>
  )
}

/*
add
 error boundary(add styles),
 404 page(add styles),
 loader +,
 routing +,
 lazy +,
 suspense +,
 prop types,
 implement useAuth +,
 optimization scrolling,
 optimization re-render,
 save token in local storage +,
 create reusable modal logic +
 create reusable form logic
 add prefix to localstorage key +
 add constants for routing
 make redirect to referrer if not authorized
 make search and display amount of items
 */
export default App
