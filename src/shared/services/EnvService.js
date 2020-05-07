const BASE_URL = 'https://jsonplaceholder.typicode.com'

let Singleton = null
class EnvService {
    constructor(filePath) { // read dot env by filepath
        if (Singleton) {
            return Singleton
        } else {
            this.baseApiUrl = BASE_URL // read from env
            Singleton = this
        }
    }
}

export default EnvService