import React, { useState } from 'react'
import  { ToastContainer }  from "react-toastify"
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../Util'

export default function Register() {

    const [loginInfo,setloginInfo] = useState({
        username: '',
        password: ''
    })

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    function getdata(e){
        var name = e.target.name 
        var value = e.target.value
         setloginInfo((old)=>{
            return{
                ...old,
                [name]:value
            }
         })
    }

    async function postdata(e){
        e.preventDefault()
        console.log(loginInfo)
        const {username,password} = loginInfo;
        if (!username || !password) {
            return handleError('All field are required')
        }
        setLoading(true);

        try{
            const url = "http://localhost:8000/api/login";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message,token,username, error } = result;
          if (success) {
            handleSuccess(message)
            localStorage.setItem('token',token)
            localStorage.setItem('logedInuser',username)
            setTimeout(() => {
                navigate('/profile')
            }, 1000);
        } else if (error) {
            const details = error?.details[0].message;
            handleError(details)
        } else if (!success) {
            handleError(message)
        } else{
            handleError(message)
        }
        } catch(error)
        {
            handleError(error)
        }finally {
            setLoading(false);
        }

    }



  return (
    <>
            <div className="register-container">
                <h2 className="register-title">Login</h2>
                <form className="register-form" onSubmit={postdata}>
                    <div className="form-group">
                        <input type="text" id="username" name="username" onChange={getdata} value={loginInfo.username}  placeholder='Enter Username' />
                    </div>


                    <div className="form-group">
                        <input type="password" id="password" name="password" onChange={getdata}  value={loginInfo.password}  placeholder='Enter Password' />
                    </div>

                    <button type='submit' className="submit-button" disabled={loading}>
                        {loading ? 'Login Up...' : 'Login'}
                    </button>
                </form>
                <p className="login-link">Don't have an account? <Link to="/register">Signup</Link></p>
            </div>
            
            <ToastContainer />
        </>

  )
}
