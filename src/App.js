import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import ErrorBoundary from "./shared/components/ErrorBoundary";
import PrivateRoute from "./shared/components/PrivateRoute";
import NotFoundPage from "./shared/components/NotFoundPage";

const SignInPage = lazy(() => import("./pages/SignInPage"));
const UserContactsListPage = lazy(() => import("./pages/UserContactsListPage"));

function App() {
    return (
        <div className="App">
            <ErrorBoundary>
                <Router>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route path="/signin" exact component={SignInPage}/>
                            <PrivateRoute path="/contacts" exact component={UserContactsListPage}/>
                            <Route component={NotFoundPage}/>
                        </Switch>
                    </Suspense>
                </Router>
            </ErrorBoundary>
        </div>
    );
}

/*
add
 error boundary(add styles),
 404 page(add styles),
 loader,
 routing +,
 lazy +,
 suspense +,
 prop types,
 optimization scrolling,
 optimization re-render,
 save token in local storage,
 create reusable modal logic
 create reusable form logic
 add prefix to localstorage key +
 add constants for routing
 make redirect to referrer if not authorized
 make search and display amount of items
 */
export default App;
