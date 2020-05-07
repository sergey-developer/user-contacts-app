import EnvService from "./EnvService";

let Singleton = null
class ConfigService {
    constructor() {
        if (Singleton) {
            return Singleton
        } else {
            this.env = new EnvService('development.env')
            this.appPrefix = 'USER_CONTACTS_APP--'
            Singleton = this
        }
    }
}

export default new ConfigService()