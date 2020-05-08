import HttpService from './HttpService/HttpService'
import ConfigService from './ConfigService'
import {LocalStorage} from '../helpers/StorageHelper'
import BrowserStorageError from '../errors/BrowserStorageError'
import AuthError from '../errors/AuthError'

export const STORAGE_AUTH_TOKEN_KEY = ConfigService.appPrefix + 'ACCESS_TOKEN'
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
      const token = 'access token'
      this.saveToken(token)
    } catch (e) {
      throw e // add custom error
    }
  }

  signOut = async () => {
    this.removeToken()
  }

  saveToken = (token) => {
    try {
      LocalStorage.set(STORAGE_AUTH_TOKEN_KEY, token)
    } catch (error) {
      if (error.name === BrowserStorageError.name) {
        throw error
      }
      throw new AuthError('Can`t sign in. Please, try again.')
    }
  }

  removeToken = () => {
    LocalStorage.remove(STORAGE_AUTH_TOKEN_KEY)
  }

  getToken = () => {
    return LocalStorage.get(STORAGE_AUTH_TOKEN_KEY)
  }

  isAuthenticated = () => {
    return !!this.getToken()
  }

  getHeaders = () => ({
    Authorization: this.getToken()
  })
}

export default new AuthService()