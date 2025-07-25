import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div style={{ borderBottom: '1px solid #ddd', marginBottom: '1rem', paddingBottom: '1rem' }}>
      <h2>{post.title}</h2>
      <p>By {post.author?.name || 'Unknown'}</p>
      {post.tags?.length > 0 && (
        <p>Tags: {post.tags.join(', ')}</p>
      )}
      <Link to={`/posts/${post._id}`}>Read More</Link>
    </div>
  );
}
