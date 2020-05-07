let Singleton = null
class ResponseHandler {
  constructor() {
    if (Singleton) {
      return Singleton
    } else {
      Singleton = this
    }
  }

  #parseJson = async (response) => {
    try {
      return response.json()
    } catch (e) {
      throw e // add custom error for passing the raw error to it
    }
  }

  #handleByCode = (response) => {
    // console.log(response, 'raw response');
    // check different status and throw different errors for them
    return response
  }

  handle = async (response) => { // create class response handler
    try {
      const rawResponse = this.#handleByCode(response)
      return this.#parseJson(rawResponse)
    } catch (e) {
      throw e // add custom error
    }
  }
}

export default new ResponseHandler()