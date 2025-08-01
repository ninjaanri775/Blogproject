import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';
import { useAuth } from '../context/AuthContext';
import PostEditor from '../components/PostEditor';

export default function EditPost() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setForm({
          title: res.data.title,
          content: res.data.content,
          tags: res.data.tags.join(', ')
        });
      } catch (err) {
        setError('Could not load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(
        `/posts/${id}`,
        {
          title: form.title,
          content: form.content,
          tags: form.tags.split(',').map((tag) => tag.trim())
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
    }
  };

  if (loading) return <p>Loading...</p>;

return (
  <div className="create-post-container big">  
    <h1 className="create-post-title">Create New Post</h1>
    {error && <p className="error-message">{error}</p>}
    <PostEditor
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Update" 
      error={error}
    />
  </div>
);
}
