import React,{useState,useEffect} from 'react'
import Centered from './centered'
import {Card,Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { logout } from '../helpers/action'

export default function Dashboard() {
    const dispatch=useDispatch()
const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
console.log(user)
const handlelogout=(e)=>{
  e.preventDefault()
  dispatch(logout())
  
}
  return (
    <Centered>
<Card>
    <Card.Body>
       {user && <div>{user.data.user.name}</div>}
       <Button onClick={handlelogout}>logout</Button>
    </Card.Body>
</Card>
    </Centered>
  )
}
