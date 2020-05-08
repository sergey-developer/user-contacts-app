import React, {useState} from 'react'

import {useUserContacts} from '../hooks'
import UserContact from './UserContact'
import UserContactForm from './UserContactForm'
import UserContactsService from '../services/UserContactsService'
import {CREATE_MODE, EDIT_MODE} from '../../../shared/constants/common'
import useModal from '../../../shared/hooks/useModal'
import Spinner from '../../../shared/components/Spinner'

const UserContactsList = () => {
  const {Modal, isOpen, setOpen: setOpenModal} = useModal()
  const [editableContact, setEditableContact] = useState(null)
  const [mode, setMode] = useState(CREATE_MODE)
  const {contacts, isLoading, error, setContacts, setLoading} = useUserContacts()

  if (error) {
    return (
      <div>Error: {error.message}</div>
    )
  }

  if (isLoading) {
    return <Spinner/>
  }
  if (!contacts.length) {
    return <div>list is empty</div>
  }

  const handleSubmit = async (contactData) => { // handle errors from UserContactsService
    setLoading(true)
    let contact

    try {
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
      setOpenModal(false)
    } finally {
      setLoading(false)
    }
  }

  const handleClickAdd = () => {
    setMode(CREATE_MODE)
    setOpenModal(true)
  }

  const handleClickEdit = (contact) => {
    setEditableContact(contact)
    setMode(EDIT_MODE)
    setOpenModal(true)
  }

  const handleClickDelete = async (contactId) => { // handle errors from UserContactsService
    try {
      setLoading(true)
      await UserContactsService.deleteOneById(contactId)
      setContacts(contacts.filter(contact => contact.id !== contactId))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{width: '70%', margin: '0 auto'}}>
      <Modal isOpen={isOpen} setOpen={setOpenModal}>
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
        <button type="button" onClick={handleClickAdd}>
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