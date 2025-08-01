import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/login', form);
      login(res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

 return (
  <div className="auth-container big">
    <h1 className="auth-title">Login</h1>
    {error && <p className="error-message">{error}</p>}

    <form onSubmit={handleSubmit} className="auth-form">
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="auth-input"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="auth-input"
      />

      <button type="submit" className="auth-submit-btn">Login</button>
    </form>

    <p className="auth-footer-text">
      Don't have an account? <Link to="/register">Register here</Link>.
    </p>
  </div>
);
}
