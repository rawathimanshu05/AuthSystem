import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Refreshhandler({setauth}) {

    const location = useLocation();
    const navigate = useNavigate();


    useEffect(()=>{
      if(localStorage.getItem('token')){
          setauth(true);
          if(location.pathname === '/' ||  location.pathname === '/login'  || location.pathname === '/register'){
            navigate('/profile',{replace:false})
          }
      }
    },[location,navigate,setauth])


    return (
    null 
  )
}
