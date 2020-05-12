import React from 'react'
import {Link} from 'react-router-dom'

const HomePage = () => {
  return(
    <div>
      Welcome!
      <Link to="/contacts">Contacts</Link>
    </div>
  )
}

export default HomePage