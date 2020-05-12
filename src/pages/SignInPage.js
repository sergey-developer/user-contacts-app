import React, {useState} from 'react'

import Spinner from '../shared/components/Spinner'
import {useAuth} from '../shared/context/AuthContext'

const initialFormValues = {
    email: '',
    password: ''
}

const SignInPage = ({history}) => {
    const Auth = useAuth()
    const [values, setValues] = useState(initialFormValues)
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({...values, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            await Auth.login(values.email, values.password)
            setValues(initialFormValues)
            history.push('/contacts')
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    if (isLoading) {
        return <Spinner/>
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