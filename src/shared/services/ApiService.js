import HttpService from "./HttpService";
import BrowserStorageService, {LOCAL_STORAGE} from "./BrowserStorageService";
import {STORAGE_AUTH_TOKEN_KEY} from "../constants/auth";

const storage = new BrowserStorageService(LOCAL_STORAGE)

class ApiService extends HttpService {

    getUrl = (url) => {
        return this.baseUrl + url
    }

    getHeaders = () => {
        return {
            headers: {
                'Content-Type': 'application/json',
                Authorization: storage.get(this.config.appPrefix + STORAGE_AUTH_TOKEN_KEY)
            }
        }
    }

    constructor() {
        super()
        this.baseUrl = this.config.env.baseApiUrl
    }

    get = (url) => {
        const URL = this.getUrl(url)

        return this.httpGet(URL, {
            ...this.getHeaders()
        })
    }

    post = (url, payload) => {
        const URL = this.getUrl(url)

        return this.httpPost(URL, {
            ...this.getHeaders(),
            body: JSON.stringify(payload)
        })
    }

    put = (url, payload) => {
        const URL = this.getUrl(url)

        return this.httpPut(URL, {
            ...this.getHeaders(),
            body: JSON.stringify(payload)
        })
    }

    delete = async (url) => {
        const URL = this.getUrl(url)

        return this.httpDelete(URL, {
            ...this.getHeaders()
        })
    }
}

export default ApiService