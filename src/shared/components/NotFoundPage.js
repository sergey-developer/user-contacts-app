import React from 'react'
import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return(
        <div>
            <span>Page not found</span>
            <Link to="/contacts">Redirect to main page</Link>
        </div>
    )
}

export default NotFoundPage