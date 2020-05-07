import React, {useState} from "react";

import {EDIT_MODE} from "../../../shared/constants/common";

const defaultFormValues = {
    name: '',
    email: '',
    phone: ''
}

const initState = (mode, initialValues) => {
    return mode === EDIT_MODE
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
                placeholder='Name'
                name="name"
                onChange={handleChange}
                value={values.name}
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
                placeholder='Phone'
                name="phone"
                onChange={handleChange}
                value={values.phone}
            />
            <button type="submit">
                Add
            </button>
        </form>
    )
}

export default UserContactForm