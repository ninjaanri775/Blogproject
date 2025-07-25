import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';

export default function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  const isLoading = loading || searchLoading;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await API.get('/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setSearchLoading(true);
      setSearchError('');
      try {
        const res = await API.get('/posts', {
          params: { q: searchTerm.trim() || undefined },
        });
        setPosts(res.data);
      } catch (err) {
        setSearchError('Failed to fetch posts');
        setPosts([]);
      } finally {
        setSearchLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchPosts, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

 
  const handleTagClick = (tag) => {
    const cleanTag = tag.startsWith('#') ? tag.slice(1) : tag;
    setSearchTerm(cleanTag);
  };




  return (
    <div style={{ maxWidth: '700px', margin: 'auto' }}>
      <div className='search-div' style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input className='search-input'
          type="text"
          placeholder="Search posts by tag, author, or title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flexGrow: 1, padding: '0.5rem' }}
        />
      
      </div>

      {isLoading && <p className='Loading'>Loading posts...</p>}
      {searchError && <p style={{ color: 'red' }}>{searchError}</p>}

      {!isLoading && posts.length === 0 && <p className='undefined'>No posts found.</p>}

      {!isLoading && posts.length > 0 && (
        <>
          
          {posts.map((post) => (
            <div className='post-card'
              key={post._id}
              style={{ borderBottom: '1px solid #ccc', marginBottom: '1rem' }}
            >
              <h2>{post.title}</h2>
              <p>By {post.author?.name || 'Unknown'}</p>
              {post.tags && post.tags.length > 0 && (
                <p>
                  {' '}
                  {post.tags.map((t) => (
                    <button className='tag-button'
                      key={t}
                      onClick={() => handleTagClick(t)}
                    >
                      #{t}
                    </button>
                  ))}
                </p>
              )}
              <Link className='More-content' to={`/posts/${post._id}`}>Read More</Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
