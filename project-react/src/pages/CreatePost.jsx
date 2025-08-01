import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function CreatePost() {
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      await API.post(
        '/posts',
        {
          title: form.title,
          content: form.content,
          tags: form.tags.split(',').map(tag => tag.trim())
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    }
  };

return (
  <div className="create-post-container big">
    <h1 className="create-post-title">Create New Post</h1>
    {error && <p className="error-message">{error}</p>}

    <form onSubmit={handleSubmit} className="create-post-form">
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        className="input-field"
      />

      <textarea
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={handleChange}
        rows={8}
        required
        className="textarea-field"
      />

      <input
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
        className="input-field"
      />

      <button type="submit" className="btn-submit">Publish</button>
    </form>
  </div>
);
}
