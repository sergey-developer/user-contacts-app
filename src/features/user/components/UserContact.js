import React from 'react'

const UserContact = ({contact, onClickEdit, onClickDelete}) => {
    const {firstName, lastName, age, email} = contact

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span>
                Name: {firstName} {lastName}
            </span>
            <span>
                Age: {age}
            </span>
            <span>
                Email: {email}
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