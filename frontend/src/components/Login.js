import React, { useRef, useState } from 'react';
import Centered from './centered';
import axios from 'axios';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';



export default function Login() {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const [err, setErr] = useState('');
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setErr('');
      await axios.post('http://localhost:5000/api/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      console.log('login successful');
      navigate('/');
      
    } catch (err) {
      
      setErr(err.response.data.message);
    }
  };

  

  return (
    <Centered>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Login</h2>
          {err && <Alert>{err}</Alert>}
          <Form onSubmit={handlesubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} />
            </Form.Group>
            <Button type='submit' className='w-100 mt-4'>
              Login
            </Button>
          </Form>

          <div className='w-100 text-center mt-4'>
            <Link to='/forgot-password'>forgot password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>Signup</Link>
      </div>
    </Centered>
  );
}
