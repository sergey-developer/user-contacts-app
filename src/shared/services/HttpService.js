import ConfigService from './ConfigService'
import ResponseHandler from '../helpers/ResponseHandler'

class HttpRequest {
  constructor(config) {
    this.config = config
  }

  #getUrl = (url) => this.config.baseUrl + url

  #getHeaders = (headers = {}) => ({
    'Content-Type': 'application/json',
    ...headers
  })

  #getOptions = (options = {}) => {
    const result = {
      ...options,
      method: options.method ? options.method : 'GET',
      headers: this.#getHeaders(options.headers)
    }
    if (options.body) {
      result.body = JSON.stringify(options.body)
    }

    return result
  }

  request = async (url, options) => {
    const response = await fetch(
      this.#getUrl(url),
      this.#getOptions(options)
    )
    return ResponseHandler.handle(response)
  }
}

let Singleton = null
class HttpService extends HttpRequest {
  constructor() {
    if (Singleton) {
      return Singleton
    } else {
      super({baseUrl: ConfigService.env.baseApiUrl})
      Singleton = this
    }
  }

  get = async (url, options = {}) => {
    return this.request(url, {...options, method: 'GET'})
  }

  post = async (url, payload, options = {}) => {
    return this.request(url, {...options, method: 'POST', body: payload})
  }

  put = async (url, payload, options = {}) => {
    return this.request(url, {...options, method: 'PUT', body: payload})
  }

  patch = async (url, payload, options = {}) => {
    return this.request(url, {...options, method: 'PATCH', body: payload})
  }

  delete = async (url, payload, options = {}) => {
    return this.request(url, {...options, method: 'DELETE', body: payload})
  }
}

export default new HttpService()