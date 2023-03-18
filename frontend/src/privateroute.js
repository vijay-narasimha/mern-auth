import React,{useContext} from 'react'
import {Navigate} from 'react-router-dom'
import { UserContext } from './UserContext'

export default function PrivateRoute({children}){

let {username}=useContext(UserContext)

console.log(username,'name')


return (
    
    <>
     {
    username ? children : <Navigate to='/login'></Navigate>
}
    </>
    
   


)


}