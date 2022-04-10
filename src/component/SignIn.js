import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import * as yup from 'yup'
import axios from 'axios'
import { login } from '../actions/authActions' 

import '../App.css'

import API_URL from '../config.js'

const schema = yup.object().shape({
    username: yup
        .string()
        .max(255)
        .required('username is required'),
    password: yup
        .string()
        .required('Please Enter your password')
})

const SignIn = ({ login }) => {
    const[disable, setDisable]= useState(true)
    const[loginError, setLoginError] = useState(null)
    const[formData, setFormData] = useState({
        username: "",
        password: "",
    })

    const[formErrors, setFormErrors] = useState({
        username: "",
        password: "",
    })

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()

        const userData = {username: formData.username.trim(), password: formData.password}

        axios.post(API_URL + "auth/signIn", userData)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                setFormData({username: "", password: ""});
                setLoginError(null);
                login(true);
                navigate('/');
            })
            .catch(err => {
                setFormData({username: "", password: ""})
                setLoginError(err.message)
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
        <div className="flexColNoWrap center">
            <h2> Sign up!</h2>
            <p> Sign in to your account</p>
            <p> No account? Create one <span><Link to="/register" style={{textDecoration: 'none'}}>Here</Link></span></p>
            {loginError && <p className="errorMessage"> {`An error occurred while logging in: ${loginError}`}</p>}
            <form className="formLabels signForms" onSubmit={handleSubmit}>
                <label className="formLabels"> username: 
                    <input name='username' onChange={handleChange} value={formData.username} type="text" maxLength="255"/>
                    <p>{formErrors.username}</p>
                </label>
                <label className="formLabels"> Password: 
                    <input name='password' onChange={handleChange} value={formData.password} type="password" />
                    <p>{formErrors.password}</p>
                </label>
                <button className={disable? "startButton disabled": "startButton"} type="submit" disabled={disable}>Sign In !</button>
            </form>
            <p> Go back to the <span><Link to="/" style={{textDecoration: 'none'}}>Main page</Link></span></p>
        </div>
    )
}

const MapStateToProps = state => {
    return {}
}

export default connect(MapStateToProps,{login})(SignIn);