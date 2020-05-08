import {useEffect} from 'react'

import useRequest from '../../shared/hooks/useRequest'
import UserContactsService from './services/UserContactsService'

export const useUserContacts = () => {
  const {
    request: getContacts,
    response: contacts,
    isLoading,
    error,
    setResponse: setContacts,
    setLoading
  } = useRequest(UserContactsService.getAll, [])

  useEffect(() => {
    getContacts()
  }, [getContacts])

  return {
    contacts,
    isLoading,
    error,
    setContacts,
    setLoading
  }
}
