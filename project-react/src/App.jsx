import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import PostFeed from './pages/PostFeed';
import PostDetails from './pages/PostDetails';
import CreatePost from './pages/CreatePost';
import { useAuth } from './context/AuthContext';
import EditPost from './pages/EditPost';

export default function App() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostFeed />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
      </Routes>
    </>
  );
}
