import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import axios from 'axios'

import '../App.css'


const schema = yup.object().shape({
    email: yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
    password: yup
        .string()
        .required('Please Enter your password')
})

const SignIn = () => {
    const[disable, setDisable]= useState(true)
    const[formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const[formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    })

    const handleSubmit = e => {
        e.preventDefault()
        const userData = {email: formData.email.trim(), password: formData.password}
    //     axios.post("/", userData)
    //         .then(res => {
    //             //do something with res
    //             setFormData({email: "", password: ""})
    //         })
    //         .catch( err => console.log(err.message))
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
            <p> Sign in to your account</p>
            <p> No account? Create one <span><Link to="/register" style={{textDecoration: 'none'}}>Here</Link></span></p>
            <form className="formLabels signForms" onSubmit={handleSubmit}>
                <label className="formLabels"> email: 
                    <input name='email' onChange={handleChange} value={formData.email} type="email" maxLength="255"/>
                    <p>{formErrors.email}</p>
                </label>
                <label className="formLabels"> Password: 
                    <input name='password' onChange={handleChange} value={formData.password} type="password" />
                    <p>{formErrors.password}</p>
                </label>
                <button className="signButton" type="submit" disabled={disable}>Sign In !</button>
            </form>
            <p> Go back to the <span><Link to="/" style={{textDecoration: 'none'}}>Main page</Link></span></p>
        </div>
    )
}
export default SignIn;