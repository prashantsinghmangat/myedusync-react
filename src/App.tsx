
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Notes from './pages/Notes';
import About from './pages/About';
import Blog from './pages/Blog';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Index from './pages/Index';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import NoteDetail from './pages/NoteDetail';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Whiteboard from './pages/Whiteboard';
import AddNotes from './pages/AddNotes';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/notes/:id" element={<NoteDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/whiteboard" element={<Whiteboard />} />
      <Route path="/add-notes" element={<AddNotes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
