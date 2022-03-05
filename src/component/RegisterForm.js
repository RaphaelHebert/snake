import { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from 'axios'


const handleSubmit = e => {
    e.preventDefault()
    //post to the backend
}

const schema = yup.object().shape({
    uname: yup
        .string()
        .required("a username is required")
        .min(3, "must be at least 3 characters long")
        .max(24, "username is 24 characters max"),
    email: yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
    password: yup
        .string()
        .required('Please Enter your password')
        .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')

})

const RegisterForm = () => {
    const[disable, setDisable]= useState(true)
    const[formData, setFormData] = useState({
        uname: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    })

    const[formErrors, setFormErrors] = useState({
        uname: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    })

    const handleFormError = (name, value) => {
        yup.reach(schema, name).validate(value)
            .then(() => {
                setFormErrors({
                    ...formErrors,
                    [name]: ''
                })
            })
            .catch(err => {
                setFormErrors({
                    ...formErrors,
                    [name]: err.errors[0]
                })
            })
    }

    const handleChange = e => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
        handleFormError(name, value)
    }

    useEffect(() => {
        schema.isValid(formData)
            .then(valid => setDisable(!valid))
    }, [formData])

    return(
        <div className="flexColCenter">
            <h2> Sign up!</h2>
            <p> Sign up to be able to login and compete with the other players</p>
            <form onSubmit={handleSubmit}>
                <label> Username: 
                    <input name='uname' onChange={handleChange} value={formData.uname} type="text" maxlength="24"/>
                    <p>{formErrors.uname}</p>
                </label>
                <label> email: 
                    <input name='email' onChange={handleChange} value={formData.email} type="email" maxlength="255"/>
                    <p>{formErrors.email}</p>
                </label>
                <label> Password: 
                    <input name='password' onChange={handleChange} value={formData.password} type="password" />
                    <p>{formErrors.password}</p>
                </label>
                <label> Password confirmation: 
                    <input name='passwordConfirmation' onChange={handleChange} value={formData.passwordConfirmation} type="password" />
                    <p>{formErrors.passwordConfirmation}</p>
                </label>
                <button className="startButton" type="submit" disabled={disable}>Register !</button>
            </form>
        </div>
    )
}
export default RegisterForm;