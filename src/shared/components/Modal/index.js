import React from 'react'
import {createPortal} from 'react-dom'

import Icon from '../Icons'

import './styles.css'

const Modal = ({children, isOpen, setOpen}) => {
  const component = isOpen && (
    <div className="overlay">
      <div className="modal">
        <button
          className="modal-close"
          type="button"
          onClick={() => setOpen(false)}
        >
          <Icon name='cancel'/>
        </button>
        <div className="modal-body">
            {children}
        </div>
      </div>
    </div>
  )

  return createPortal(
    component,
    document.querySelector('#modal-root')
  )
}

export default Modal