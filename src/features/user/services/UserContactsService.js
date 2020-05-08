import HttpService from '../../../shared/services/HttpService/HttpService'
import AuthService from '../../../shared/services/AuthService'
import {
  CREATE_USER_CONTACT,
  DELETE_USER_CONTACT,
  GET_USER_CONTACTS,
  UPDATE_USER_CONTACT
} from '../../../shared/constants/api'

let Singleton = null
class UserContactsService {
  constructor() {
    if (Singleton) {
      return Singleton
    } else {
      this.api = HttpService
      Singleton = this
    }
  }

  createOne = async (contactData) => {
    try {
      return this.api.post(CREATE_USER_CONTACT, contactData)
    } catch (e) {
      throw e // add custom error
    }
  }

  updateOneById = async (id, updates) => {
    const url = UPDATE_USER_CONTACT.replace(':id', id)
    try {
      return this.api.patch(url, updates)
    } catch (e) {
      throw e // add custom error
    }
  }

  deleteOneById = async (id) => {
    const url = DELETE_USER_CONTACT.replace(':id', id)
    try {
      return this.api.delete(url)
    } catch (e) {
      throw e // add custom error
    }
  }

  getAll = async () => {
    try {
      return this.api.get(GET_USER_CONTACTS, {
        headers: AuthService.getHeaders()
      })
    } catch (e) {
      throw e // add custom error
    }
  }
}

export default new UserContactsService()