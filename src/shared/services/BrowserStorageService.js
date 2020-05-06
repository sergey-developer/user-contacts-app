import BrowserStorageError from '../errors/BrowserStorageError'

export const LOCAL_STORAGE = 'localStorage'
export const SESSION_STORAGE = 'sessionStorage'

const BrowserStorageService = (function () {
    let storage

    function getStorageByName(storageName) {
        if (!window[storageName]) {
            throw new BrowserStorageError(`Your browser does not support "${storageName}"`)
        }
        return window[storageName]
    }

    return class StorageService {
        constructor(storageName) {
            storage = getStorageByName(storageName)
            this.name = storageName
            this.length = storage.length
        }

        get = (key) => {
            return storage.getItem(key)
        }

        set = (key, item) => {
            try {
                storage.setItem(key, item)
            } catch (error) {
                throw new BrowserStorageError(`Storage is full, please clean up it`)
            }
        }

        remove = (key) => {
            storage.removeItem(key)
            return true
        }

        clear = () => {
            storage.clear()
            return true
        }

        each = (callback) => {
            for (let i = 0; i < storage.length; i++) {
                const key = storage.key(i);
                const item = this.get(key)
                callback(key, item)
            }
        }
    }
})()

export default BrowserStorageService