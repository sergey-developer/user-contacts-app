import EnvService from "./EnvService";

const APP_PREFIX = 'USER_CONTACTS_APP--'

class ConfigService {
    constructor() {
        this.env = new EnvService()
        this.appPrefix = APP_PREFIX
    }
}
// make singleton
export default ConfigService