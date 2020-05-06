const BASE_URL = 'http://localhost:3000'

class EnvService {
    constructor() {
        this.baseApiUrl = BASE_URL // read from env
        // this.baseBucketUrl = 'https://bucket.firebase.com/'
    }
}

export default EnvService