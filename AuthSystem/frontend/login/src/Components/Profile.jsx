import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../Util';
import { ToastContainer } from 'react-toastify';


export default function Profile() {

    const [loguser,setloguser] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(()=>{
        setloguser(localStorage.getItem('logedInuser'))
    },[])

    function handellogout (e){
        setLoading(true);
     localStorage.removeItem('token');
     localStorage.removeItem('logedInuser');
     handleSuccess('User logged out successfully')
     setTimeout(() => {
        navigate('/login')
     }, 1000);
    }

  return (
    <>

    <div class="register-container">
        <h1  class="profile-title">Login User Profile</h1>
        <h3 class="profile-title">Name:  {loguser}</h3>
        <p class="profile-description">Work as Developer in NIC</p>
        <button type="submit" class="submit-button" onClick={handellogout} disabled={loading}>
            {loading ? 'Logging out...' : 'Logout'}
        </button>
    </div>




     <ToastContainer/>
    </>
  )
}
