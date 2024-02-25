import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from './AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());

  useEffect(() => {
    const checkAuthentication = () => {
      setIsAuthenticated(AuthService.isAuthenticated());
    };

    // Subscribe to authentication changes
    AuthService.subscribe(checkAuthentication);

    // Unsubscribe on component unmount
    return () => {
      AuthService.unsubscribe(checkAuthentication);
    };
  }, []);

  const login = async (username, password) => {
    try {
      const success = await AuthService.login(username, password);
      if (success) {
        setIsAuthenticated(true);
      }
      return success;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
