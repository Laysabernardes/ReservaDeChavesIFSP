import React from 'react' 
import { Navigate } from 'react-router-dom'


export function PrivateRoute({ children }) {
 

  const user = JSON.parse(localStorage.getItem('userData'));
  return user ? children : <Navigate to="/" />;
}

