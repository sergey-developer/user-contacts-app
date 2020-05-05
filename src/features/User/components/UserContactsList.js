import React, {useState} from "react";

import Modal from "../../../shared/components/Modal";

import {useUserContacts} from "../hooks";
import UserContact from "./UserContact";
import UserContactForm from "./UserContactForm";
import UserContactService from "../services/UserContactsService";

const CREATE = 'CREATE'
const EDIT = 'EDIT'

const UserContactsList = () => {
    const [isShowModal, setShowModal] = useState(false)
    const [editableContact, setEditableContact] = useState(null)
    const [mode, setMode] = useState(CREATE) // add to constants
    const {contacts, setContacts, isLoading, setIsLoading, error} = useUserContacts()

    if (error) {
        return (
            <div>Error: {error.message}</div>
        )
    }

    if (isLoading) {
        return (
            <div>isLoading</div>
        )
    }

    const handleSubmit = async (contactData) => { // handle errors from UserContactService
        try {
            setIsLoading(true)
            let contact
            if (mode === CREATE) {
                contact = await UserContactService.createOne(contactData)
                setContacts([...contacts, contact])
            } else if (mode === EDIT) {
                contact = await UserContactService.updateOneById(contactData)
                const index = contacts.findIndex(c => c.id === contact.id)
                const newContacts = contacts.splice(index, 1, contact)
                console.log(newContacts); // prevent mutation "contacts"
            }
            setShowModal(false)
        } finally {
            setIsLoading(false)
        }
    }

    const handleClickEdit = (contact) => {
        setEditableContact(contact)
        setMode(EDIT)
        setShowModal(true)
    }

    const handleClickDelete = async (contactId) => { // handle errors from UserContactService
        try {
            setIsLoading(true)
            await UserContactService.deleteOneById(contactId)
            setContacts(contacts.filter(contact => contact.id !== contactId))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div style={{width: '50%', margin: '0 auto'}}>
            <Modal isShow={isShowModal} setShow={setShowModal}>
                <UserContactForm
                    mode={mode}
                    initialValues={editableContact}
                    onSubmit={handleSubmit}
                />
            </Modal>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <input
                    type="text"
                    placeholder="search..."
                />
                <button type="button" onClick={() => setShowModal(true)}>
                    Add new
                </button>
            </div>
            <div>
                {contacts.map(contact => (
                    <UserContact
                        key={contact.id}
                        contact={contact}
                        onClickEdit={handleClickEdit}
                        onClickDelete={handleClickDelete}
                    />
                ))}
            </div>
        </div>
    )
}

export default UserContactsList