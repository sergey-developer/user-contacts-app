import React, {lazy, Suspense} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import NotFound from '../shared/components/NotFound'
import {useAuth} from '../shared/context/AuthContext'

const HomePage = lazy(() => import('../pages/HomePage'))
const SignInPage = lazy(() => import('../pages/SignInPage'))
const UserContactsListPage = lazy(() => import('../pages/UserContactsListPage'))

const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true,
  },
  {
    path: '/signin',
    component: SignInPage,
    exact: true,
  },
  {
    path: '/contacts',
    component: UserContactsListPage,
    exact: true,
    private: true,
    redirectPath: '/signin'
  },
]

const Routes = () => {
  const {isAuthenticated} = useAuth()

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {routes.map((route, i) => (
            route.private && !isAuthenticated
              ? <Redirect key={i} exact from={route.path} to={route.redirectPath}/>
              : <Route
                  key={i}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
          ))}
          <Route component={NotFound}/>
        </Switch>
      </Suspense>
    </Router>
  )
}

export default Routes