import ConfigService from "./ConfigService";

class HttpService {

    constructor() {
        this.config = new ConfigService()
    }

    static parseJson = async (response) => {
        try {
            return response.json()
        } catch (e) {
            throw e // add custom error for passing the raw error to it
        }
    }

    static handleResponseByCode = (response) => {
        // console.log(response, 'raw response');
        // check different status and throw different errors for them
        return response
    }

    static handleResponse = async (response, callback) => { // create class response handler
        try {
            const rawResponse = this.handleResponseByCode(response)
            const res = await this.parseJson(rawResponse)

            if (callback) {
                return callback(res)
            }
            return res
        } catch (e) {
            throw e // add custom error
        }
    }

    httpGet = async (url, options) => {
        const response = await fetch(url, {
            ...options
        })

        return HttpService.handleResponse(response)
    }

    httpPost = async (url, options) => {
        const response = await fetch(url, {
            ...options,
            method: 'POST'
        })

        return HttpService.handleResponse(response)
    }

    httpPut = async (url, options) => {
        const response = await fetch(url, {
            ...options,
            method: 'PUT'
        })

        return HttpService.handleResponse(response)
    }

    httpDelete = async (url, options) => {
        const response = await fetch(url, {
            ...options,
            method: 'DELETE'
        })

        return HttpService.handleResponse(response)
    }
}

export default HttpService