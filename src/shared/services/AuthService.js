import HttpService from './HttpService/HttpService'
import ConfigService from './ConfigService'
import {LocalStorage} from '../helpers/StorageHelper'
import BrowserStorageError from '../errors/BrowserStorageError'
import AuthError from '../errors/AuthError'

export const STORAGE_AUTH_USER_KEY = ConfigService.appPrefix + 'USER'
let Singleton = null
class AuthService {
  constructor() {
    if (Singleton) {
      return Singleton
    } else {
      this.api = HttpService
      Singleton = this
    }
  }

  signIn = async (email, password) => {
    try {
      const user = {
        id: 1,
        name: 'John Doe',
        email,
        token: 'access token'
      }
      this.saveUserInStorage(user)

      return user
    } catch (e) {
      throw e // add custom error
    }
  }

  signOut = async () => {
    this.removeUserFromStorage()
  }

  saveUserInStorage = (user) => {
    try {
      LocalStorage.set(
        STORAGE_AUTH_USER_KEY,
        JSON.stringify(user)
      )
    } catch (error) {
      if (error.name === BrowserStorageError.name) {
        throw error
      } // ?
      throw new AuthError('Can`t sign in. Please, try again.')
    }
  }

  removeUserFromStorage = () => {
    LocalStorage.remove(STORAGE_AUTH_USER_KEY)
  }

  getUserFromStorage = () => {
    const user = LocalStorage.get(STORAGE_AUTH_USER_KEY)
    return JSON.parse(user)
  }

  getHeaders = () => {
    const {token} = this.getUserFromStorage()

    return {
      Authorization: token
    }
  }
}

export default new AuthService()