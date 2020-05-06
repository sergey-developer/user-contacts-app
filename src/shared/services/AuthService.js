import ApiService from "./ApiService";
import BrowserStorageService, {LOCAL_STORAGE} from "./BrowserStorageService";
import {STORAGE_AUTH_TOKEN_KEY} from "../constants/auth";
import BrowserStorageError from "../errors/BrowserStorageError";
import AuthError from "../errors/AuthError";

const storage = new BrowserStorageService(LOCAL_STORAGE)

class AuthService {
    constructor() {
        this.api = new ApiService()
        this.STORAGE_TOKEN_KEY = this.api.config.appPrefix + STORAGE_AUTH_TOKEN_KEY
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
            storage.set(this.STORAGE_TOKEN_KEY, token)
        } catch (error) {
            if (error.name === BrowserStorageError.name) {
                throw error
            }
            throw new AuthError('Can`t sign in. Please, try again.')
        }
    }

    removeToken = () => {
        storage.remove(this.STORAGE_TOKEN_KEY)
    }

    getToken = () => {
        return storage.get(this.STORAGE_TOKEN_KEY)
    }

    isAuthenticated = () => {
        return !!this.getToken()
    }

}

const Instance = new AuthService()
export default Instance