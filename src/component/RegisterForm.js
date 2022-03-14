import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import axios from 'axios'

import '../App.css'

import API_URL from '../config.js'

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

const baseForm = {
    uname: "",
    email: "",
    password: "",
    passwordConfirmation: ""
}

const RegisterForm = () => {
    const[disable, setDisable]= useState(true)
    const[formData, setFormData] = useState(baseForm)
    const[formErrors, setFormErrors] = useState(baseForm)
    const[registrationError, setRegistrationError] = useState(null)

    const nav = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        const newUser = {
            username: formData.uname.trim(),
            email: formData.email.trim(),
            password: formData.password,
        }
            axios.post(API_URL + "auth/signUp", newUser)
                .then(res => {
                    setFormData(baseForm)
                    setRegistrationError(null)
                    console.log(res.message)
                    nav('/SignIn',  { replace: true })
                })
                .catch(err => {
                    setFormData(baseForm)
                    setRegistrationError(`An error occurred during the registration process: \n ${err.message}. \nPlease try again later.`)
                })
    }
    

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
            {registrationError && <p className="errorMessage"> {registrationError} </p>}
            <form className="formLabels signForms" onSubmit={handleSubmit}>
                <label className="formLabels"> Username: 
                    <input name='uname' onChange={handleChange} value={formData.uname} type="text" maxLength="24"/>
                    <p>{formErrors.uname}</p>
                </label>
                <label className="formLabels"> email: 
                    <input name='email' onChange={handleChange} value={formData.email} type="email" maxLength="255"/>
                    <p>{formErrors.email}</p>
                </label>
                <label className="formLabels"> Password: 
                    <input name='password' onChange={handleChange} value={formData.password} type="password" />
                    <p>{formErrors.password}</p>
                </label>
                <label className="formLabels"> Password confirmation: 
                    <input name='passwordConfirmation' onChange={handleChange} value={formData.passwordConfirmation} type="password" />
                    <p>{formErrors.passwordConfirmation}</p>
                </label>
                <button className="signButton" type="submit" disabled={disable}>Register !</button>
            </form>
            <p> Already have an account? Sign in <span><Link to="/SignIn" style={{textDecoration: 'none'}}>Here</Link></span></p>
        </div>
    )
}
export default RegisterForm;