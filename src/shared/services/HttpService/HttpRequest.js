import ResponseHandler from '../../helpers/ResponseHandler'

class HttpRequest {
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

  constructor(config) {
    this.config = config
  }

  request = async (url, options) => {
    const response = await fetch(
      this.#getUrl(url),
      this.#getOptions(options)
    )
    return ResponseHandler.handle(response)
  }
}

export default HttpRequest