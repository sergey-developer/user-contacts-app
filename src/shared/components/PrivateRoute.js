import React from "react";
import {Redirect, Route} from "react-router-dom";

import AuthService from "../services/AuthService";

const PrivateRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} render={(props) => {
        return AuthService.isAuthenticated()
            ? <Component {...props}/>
            : <Redirect to='/signin'/>
    }} />
}

export default PrivateRoute