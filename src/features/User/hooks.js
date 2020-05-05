import {useEffect, useState} from 'react'

import useFetch from "../../shared/hooks/useFetch";
import UserContactsService from './services/UserContactsService'

export const useUserContacts = () => {
    const [contacts, setContacts] = useState([])
    const {response, error, isLoading, setIsLoading} = useFetch(UserContactsService.getAll)

    useEffect(() => {
        setContacts(response)
    }, [response])

    return {contacts, setContacts, isLoading, setIsLoading, error}
}
