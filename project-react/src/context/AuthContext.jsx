import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);


      const fetchUser = async () => {
        try {
          const res = await API.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(res.data); 
        } catch (err) {
          console.error('Failed to fetch user', err);
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
        }
      };

      fetchUser();

    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
