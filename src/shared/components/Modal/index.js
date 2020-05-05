import React from 'react'
import {createPortal} from 'react-dom'

import './styles.css'

const Modal = ({children, isShow, setShow}) => {
    const component = isShow && (
        <div className="overlay">
            <div className="modal">
                <button
                    className="modal-close"
                    type="button"
                    onClick={() => setShow(false)}
                >
                    X
                </button>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    )

    return createPortal(component, document.body)
}

export default Modal