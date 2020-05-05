import {BASE_URL} from "../../../shared/constants/api";

class BaseHttpService {

    parseJson = async (response) => {
        try {
            return response.json()
        } catch (e) {
            throw e // add custom error for passing the raw error to it
        }
    }

    handleResponseByCode = (response) => {
        console.log(response, 'raw response');
        // check different status and throw different errors for them
        return response
    }

    handleResponse = async (response, callback) => {
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
}

// add BASE_URL into base http service
// create it in base http service
// const handleResponse = async (response) => {
//     try {
//         return response.json()
//     } catch (e) {
//         throw e // add custom error
//     }
// }

class UserContactsService extends BaseHttpService {
    // handleResponse = async (res, callback) => {
    //     const response = await super.handleResponse(res) // it does not work, handle it
    //     console.log(response, 'response');
    //     if (callback) {
    //         return callback(response)
    //     }
    //     return response
    // }

    createOne = async (contactData) => {
        try {
            const response = await fetch(`${BASE_URL}/contacts`, {
                method: 'POST',
                body: JSON.stringify(contactData),
                headers: {
                    'Content-Type': 'application/json',
                    Token: 'someToken'
                }
            })

            return this.handleResponse(response)
        } catch (e) {
            throw e // add custom error
        }
    }

    updateOneById = async (updates) => {
        try {
            const response = await fetch(`${BASE_URL}/contacts/${updates.id}/erryeqwyryqwgeryqgergqrqreqw`, {
                method: 'PUT',
                body: JSON.stringify(updates),
                headers: {
                    'Content-Type': 'application/json',
                    Token: 'someToken'
                }
            })

            return this.handleResponse(response)
        } catch (e) {
            throw e // add custom error
        }
    }

    deleteOneById = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/contacts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Token: 'someToken'
                }
            })

            return this.handleResponse(response)
        } catch (e) {
            throw e // add custom error
        }
    }

    getAll = async () => {
        try {
            const response = await fetch(`${BASE_URL}/contacts`, {
                headers: {
                    'Content-Type': 'application/json',
                    Token: 'someToken'
                }
            })

            return this.handleResponse(response, (allContacts) => {
                if (Array.isArray(allContacts)) {
                    return allContacts
                } else {
                    return []
                }
            })
        } catch (e) {
            throw e // add custom error
        }
    }
}

const instance = new UserContactsService()
// make singleton
export default instance