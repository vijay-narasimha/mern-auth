import React,{useRef,useState} from 'react'
import Centered from './centered'
import axios from 'axios'
import {Form,Button,Card,Alert} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {login} from '../helpers/action'


export default function Login() {
const emailRef=useRef()
const passwordRef=useRef()
const [err,setErr]=useState('')
const dispatch=useDispatch()
const handlesubmit=async(e)=>{
    e.preventDefault()
//     try{
//         setErr('')
// const user=await axios.post('http://localhost:5000/api/login',{
//     email:emailRef.current.value,
//     password:passwordRef.current.value
// })
//   localStorage.setItem('user'.JSON.stringify(user))
//     }catch(err){
//         setErr(err.response.data.message)
//     }
const user={
    email:emailRef.current.value,
    password:passwordRef.current.value
}
dispatch(login({...user}))

}

  return (
<Centered>
<Card>
    <Card.Body>
        <h2 className='text-center mb-4'>Login</h2>
        {err && <Alert>{err}</Alert>}
        <Form onSubmit={handlesubmit}>
            <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef}/>
            </Form.Group>
            <Form.Group id='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' ref={passwordRef}/>
            </Form.Group>
            <Button type='submit' className='w-100 mt-4'>Login</Button>
        </Form>
        
        <div className='w-100 text-center mt-4'><Link to='/forgot-password'>forgot password</Link></div>

    </Card.Body>
</Card>
<div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>Signup</Link>
      </div>
</Centered>

  )
}
