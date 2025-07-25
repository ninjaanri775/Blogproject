import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function PostDetails() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className='loading'>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!post) return <p>Post not found</p>;

  console.log('Current user:', user);
  console.log('Post author:', post.author);

  const userId = user?._id || user?.id;
  const postAuthorId = post.author?._id || post.author?.id;
  const isAuthor = userId && postAuthorId && userId.toString() === postAuthorId.toString();

  console.log('User ID:', userId);
  console.log('Post Author ID:', postAuthorId);
  console.log('Is Author?', isAuthor);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await API.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (err) {
      alert('Failed to delete post');
    }
  };

return (
  <div className="post-details-container">
    <h1 className="post-title">{post.title}</h1>
    <p className="post-author">By: {post.author?.name || 'Unknown'}</p>

    <div className="post-content">{post.content}</div>

    {post.tags && post.tags.length > 0 && (
      <p className="post-tags">Tags: {post.tags.join(', ')}</p>
    )}

    {isAuthor && (
      <div className="post-actions">
        <Link to={`/posts/${id}/edit`}>
          <button className="btn btn-edit">Edit Post</button>
        </Link>
        <button onClick={handleDelete} className="btn btn-delete">
          Delete Post
        </button>
      </div>
    )}
  </div>
);
}
