import React from 'react'

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
                edit
            </span>
            <span onClick={() => onClickDelete(contact.id)}>
                X
            </span>
        </div>
    )
}

export default UserContact