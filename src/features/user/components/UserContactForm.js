import React, {useState} from "react";

const defaultFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    age: ''
}

const initState = (mode, initialValues) => {
    return mode === 'EDIT'
        ? initialValues
        : defaultFormValues
}

const UserContactForm = ({onSubmit, mode, initialValues}) => {
    const [values, setValues] = useState(() => initState(mode, initialValues))

    const handleSubmit = async (event) => {
        event.preventDefault();
        await onSubmit(values)
        // try { // can be deleted
        //     await onSubmit(values)
        // } finally {
        //     setValues(defaultFormValues)
        // }
    }
    // add delegating handlers, validation: trim, disable while loading
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({...values, [name]: value})
    }

    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                required
                placeholder='First name'
                name="firstName"
                onChange={handleChange}
                value={values.firstName}
            />
            <input
                type="text"
                required
                placeholder='Last name'
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
            />
            <input
                type="text"
                required
                placeholder='Email'
                name="email"
                onChange={handleChange}
                value={values.email}
            />
            <input
                type="text"
                placeholder='Age'
                name="age"
                onChange={handleChange}
                value={values.age}
            />
            <button type="submit">
                Add
            </button>
        </form>
    )
}

export default UserContactForm