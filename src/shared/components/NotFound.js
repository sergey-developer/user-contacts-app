import React from 'react'
import {Link} from "react-router-dom";

const NotFound = () => {
    return(
        <div>
            <span>Page not found</span>
            <Link to="/contacts">Redirect to main page</Link>
        </div>
    )
}

export default NotFound