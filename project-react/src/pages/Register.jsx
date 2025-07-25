import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/auth/register', form);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

   return (
    <div className="auth-container">
      <h1 className="auth-title">Register</h1>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="auth-input"
        />

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

        <button type="submit" className="auth-submit-btn">Register</button>
      </form>

      <p className="auth-footer-text">
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
}
