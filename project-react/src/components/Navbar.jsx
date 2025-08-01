import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className='nav' >


      <Link className='Nav-home' to="/"><img className='home-img' src="/images/Vector.png" alt="" />Blog Posts</Link>

      {token ? (
        <>
          <Link className='Nav-create' to="/create">+  Create new</Link>
          <button className='Nav-Logout' onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link className='Nav-login' to="/login">Login</Link>
          <Link className='Nav-register' to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
