
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { LoadingProvider } from '@/providers/LoadingProvider';
import { Toaster } from "@/components/ui/sonner";
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
import BecomeTutor from './pages/BecomeTutor';
import FindTutorSteps from './pages/FindTutorSteps';
import FindTutor from './pages/FindTutor';
import TutorFinder from './pages/TutorFinder';
import TutorDetail from './pages/TutorDetail';
import Contact from './pages/Contact';
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import TeacherDashboard from './pages/teacher/Dashboard';
import TeacherProfile from './pages/teacher/Profile';

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="app-theme">
        <LoadingProvider>
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
            <Route path="/become-tutor" element={<BecomeTutor />} />
            <Route path="/find-tutor-steps" element={<FindTutorSteps />} />
            <Route path="/find-tutor" element={<FindTutor />} />
            <Route path="/tutor-finder" element={<TutorFinder />} />
            <Route path="/tutor/:id" element={<TutorDetail />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Student Routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            
            {/* Teacher Routes */}
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/profile" element={<TeacherProfile />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </LoadingProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
