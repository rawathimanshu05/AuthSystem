import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from '../Util'

export default function Register() {

    const [registerInfo, setregisterInfo] = useState({
        username: '',
        email: '',
        password: '',
    })

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()


    const handelchange = (e) => {
        var name = e.target.name
        var value = e.target.value
        setregisterInfo((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }



    const handelSubmit = async (e) => {
        e.preventDefault()

        const { username, email, password } = registerInfo

        if (!username || !email || !password) {
            return handleError("Please fill all the fields")
        }

        setLoading(true)

        try {
          const url = "http://localhost:8000/api/register";
          const response = await fetch(url,{
            method: "POST",
            headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerInfo)
          });
          const result = await response.json();
          const { success, message, error } = result;
          if (success) {
            handleSuccess(message)
            setTimeout(() => {
                navigate('/login')
            }, 1000);
        } else if (error) {
            const details = error?.details[0].message;
            handleError(details)
        } else if (!success) {
            handleError(message)
        } else{
            handleError(message)
        }
        } catch (error) {

            handleError(error)
        } finally {
            setLoading(false);
        }

    }


    return (
        <>
            <div className="register-container">
                <h2 className="register-title">Register</h2>
                <form className="register-form" onSubmit={handelSubmit}>
                    <div className="form-group">
                        <input type="text" id="username" name="username" onChange={handelchange} value={registerInfo.username} placeholder='Enter Username' />
                    </div>

                    <div className="form-group">
                        <input type="email" id="email" name="email" onChange={handelchange} value={registerInfo.email} placeholder='Enter Email' />
                    </div>

                    <div className="form-group">
                        <input type="password" id="password" name="password" onChange={handelchange} value={registerInfo.password} placeholder='Enter Password' />
                    </div>

                    <button type='submit' className="submit-button" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <p className="login-link">Already have an account? <Link to="/login">Signup</Link></p>
            </div>

            <ToastContainer />
        </>

    )
}
