import React, {useState} from "react";

import AuthService from "../shared/services/AuthService";

const initialFormValues = {
    email: '',
    password: ''
}

const SignInPage = ({history}) => {
    const [values, setValues] = useState(initialFormValues)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({...values, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            await AuthService.signIn(values.email, values.password)
            setValues(initialFormValues)
            history.push('/contacts')
        } catch (error) {
            setError(error)
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return(
            <div>Loading</div>
        )
    }

    return(
        <div>
            {error && <div>Error: {error.message}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    required
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    required
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                >
                    SignIn
                </button>
            </form>
        </div>
    )
}

export default SignInPage