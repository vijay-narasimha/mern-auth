import React from 'react'
import Router from './Router';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
export default function Routes() {
    
      axios.defaults.baseURL='http://localhost:5000'
      axios.defaults.withCredentials=true


  return (
    <UserContextProvider>
<Router/>
    </UserContextProvider>
   
  )
}
