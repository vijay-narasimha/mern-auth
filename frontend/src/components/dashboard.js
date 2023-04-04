import React, { useState, useEffect, useContext } from 'react';
import Centered from './centered';
import { Card, Button } from 'react-bootstrap';

import { UserContext } from '../UserContext';


import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';
import decode from 'jwt-decode'


export default function Dashboard() {
  const navigate=useNavigate()
  async function handlelogout(e) {
    e.preventDefault();
    await axios.get('/api/logout');
    console.log('success')

  }

  const { username } = useContext(UserContext);
  
  return (
    <Centered>
      <Card>
        <Card.Body> 
        
          {username ?<>
            <div>{username}</div>
          <Button onClick={handlelogout}>logout</Button> 
        
          </>
          :
          <Button to='/login' as={Link} >Login</Button>
         
        }
        </Card.Body>
      </Card>
    </Centered>
  );
}
