import React from 'react'

import ArrowBackIcon from './ArrowBackIcon'
import CancelIcon from './CancelIcon'
import EditIcon from './EditIcon'

const Icon = ({name}) => {
  if (name === 'arrow-back') {
    return <ArrowBackIcon/>
  } else if (name === 'cancel') {
    return <CancelIcon/>
  } else if (name === 'edit') {
    return <EditIcon/>
  }
}

export default Icon