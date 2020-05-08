import React from 'react'

import Icon from '../../../shared/components/Icons'

const UserContact = ({contact, onClickEdit, onClickDelete}) => {
    const {name, phone, email} = contact

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span>
                Name: {name}
            </span>
            <span>
                Email: {email}
            </span>
            <span>
                Phone: {phone}
            </span>
            <span onClick={() => onClickEdit(contact)}>
                <Icon name='edit'/>
            </span>
            <span onClick={() => onClickDelete(contact.id)}>
                <Icon name='cancel'/>
            </span>
        </div>
    )
}

export default UserContact