import React,{useState} from 'react'
import {Navigate} from 'react-router-dom'

export default function PrivateRoute({children}){

    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
if (!user) return <Navigate to='/login'></Navigate>

    return children
}