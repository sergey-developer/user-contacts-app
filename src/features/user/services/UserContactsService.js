// handleResponse = async (res, callback) => {
//     const response = await super.handleResponse(res) // it does not work, handle it
//     console.log(response, 'response');
//     if (callback) {
//         return callback(response)
//     }
//     return response
// }
import ApiService from "../../../shared/services/ApiService";

class UserContactsService {
    constructor() {
        this.api = new ApiService()
    }

    createOne = async (contactData) => {
        try {
            return this.api.post('/contacts', contactData)
        } catch (e) {
            throw e // add custom error
        }
    }

    updateOneById = async (id, updates) => {
        try {
            return this.api.put(`/contacts/${id}`, updates)
        } catch (e) {
            throw e // add custom error
        }
    }

    deleteOneById = async (id) => {
        try {
            return this.api.delete(`/contacts/${id}`)
        } catch (e) {
            throw e // add custom error
        }
    }

    getAll = async () => {
        try {
            const response = await this.api.get('/contacts')

            if (Array.isArray(response)) {
                return response
            } else {
                return []
            }
        } catch (e) {
            throw e // add custom error
        }
    }
}

const Instance = new UserContactsService()
// make singleton
export default Instance