import React, { useRef, useState } from 'react';
import Centered from './centered';
import axios from 'axios';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom'

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef=useRef()
  const passwordconfirmRef=useRef()
  const [err, setErr] = useState('');
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setErr('');
      
      const user = await axios.post('http://127.0.0.1:5000/api/signup', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        name:nameRef.current.value,
        passwordconfirm:passwordconfirmRef.current.value
      });
      
      
    } catch (err) {
        console.log(err)
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
            <Form.Group id='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' ref={nameRef} />
            </Form.Group>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} />
            </Form.Group>
            <Form.Group id='passwordconfirm'>
              <Form.Label>Password confirm</Form.Label>
              <Form.Control type='password' ref={passwordconfirmRef} />
            </Form.Group>
            <Button type='submit' className='w-100 mt-4'>
              Signup
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/login'>Login</Link>
      </div>
    </Centered>
  );
}
