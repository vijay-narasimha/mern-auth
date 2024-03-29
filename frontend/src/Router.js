import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import PrivateRoute from './privateroute';
export default function Router() {
    const router = createBrowserRouter([
        {
          path: '/',
          element: (
          <Dashboard/>)
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: 'signup',
          element: <Signup />,
        },
      ]);
  return (
    <RouterProvider router={router} />
    
  )
}
