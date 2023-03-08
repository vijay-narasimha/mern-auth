import React from 'react';
import { Container } from 'react-bootstrap';

export default function Centered({ children }) {
  return (
    <Container
      style={{ minHeight: '100vh' }}
      className='d-flex align-items-center justify-content-center'
    >
      <div className='w-100' style={{ maxWidth: '400px' }}>
        {children}
      </div>
    </Container>
  );
}
