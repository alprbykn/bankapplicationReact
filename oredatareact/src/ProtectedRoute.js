// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useEffect, useState } from 'react';


const ProtectedRoute = ({ component: Component, ...routeProps }) => {
    const { isAuthenticated } = useAuth();
  const [authState, setAuthState] = useState(isAuthenticated);


    if (isAuthenticated) {
        console.log("success to login")
      return <Component {...routeProps} />
  
    } else {
        console.log("roted to login")
      return <Navigate to="/login" />;
    }
  };

  export default ProtectedRoute;
