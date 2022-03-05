import { useState } from 'react'
import axios from 'axios'


const handleSubmit = e => {
    e.preventDefault()
    //post to the backend
}

const RegisterForm = () => {
    
    const[formData, setFormData] = useState({
        uname: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    })

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return(
        <div className="flexColCenter">
            <h2> Sign up!</h2>
            <p> Sign up to be able to login and compete with the other players</p>
            <form onSubmit={handleSubmit}>
                <label> Username: 
                    <input name='uname' onChange={handleChange} value={formData.uname} type="text"/>
                </label>
                <label> email: 
                    <input name='email' onChange={handleChange} value={formData.email} type="email" />
                </label>
                <label> Password: 
                    <input name='password' onChange={handleChange} value={formData.password} type="password" />
                </label>
                <label> Password confirmation: 
                    <input name='passwordConfirmation' onChange={handleChange} value={formData.passwordConfirmation} type="password" />
                </label>
            </form>
        </div>
    )
}
export default RegisterForm;