import React, {useState} from "react";

import Modal from "../../../shared/components/Modal";
import {useUserContacts} from "../hooks";
import UserContact from "./UserContact";
import UserContactForm from "./UserContactForm";
import UserContactsService from "../services/UserContactsService";
import {CREATE_MODE, EDIT_MODE} from "../../../shared/constants/common";

const UserContactsList = () => {
    const [isShowModal, setShowModal] = useState(false)
    const [editableContact, setEditableContact] = useState(null)
    const [mode, setMode] = useState(CREATE_MODE)
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
    if (!contacts.length) {
        return <div>list is empty</div>
    }

    const handleSubmit = async (contactData) => { // handle errors from UserContactsService
        try {
            setIsLoading(true)
            let contact
            if (mode === CREATE_MODE) {
                contact = await UserContactsService.createOne(contactData)
                setContacts([...contacts, contact])
            } else if (mode === EDIT_MODE) {
                const {id, ...updates} = contactData
                contact = await UserContactsService.updateOneById(id, updates)

                const index = contacts.findIndex(c => c.id === contact.id)
                const newContacts = [...contacts]
                newContacts.splice(index, 1, contact)
                setContacts(newContacts)
            }
            setShowModal(false)
        } finally {
            setIsLoading(false)
        }
    }

    const handleClickEdit = (contact) => {
        setEditableContact(contact)
        setMode(EDIT_MODE)
        setShowModal(true)
    }

    const handleClickDelete = async (contactId) => { // handle errors from UserContactsService
        try {
            setIsLoading(true)
            await UserContactsService.deleteOneById(contactId)
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