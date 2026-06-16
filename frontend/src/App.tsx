import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Projects from './pages/Projects';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';

import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminNews from './pages/admin/AdminNews';
import AdminProjects from './pages/admin/AdminProjects';
import AdminEvents from './pages/admin/AdminEvents';
import AdminGallery from './pages/admin/AdminGallery';
import AdminContacts from './pages/admin/AdminContacts';
import AdminFAQ from './pages/admin/AdminFAQ';
import AdminAbout from './pages/admin/AdminAbout';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout><Home /></Layout>} path="/" />
          <Route element={<Layout><About /></Layout>} path="/about" />
          <Route element={<Layout><News /></Layout>} path="/news" />
          <Route element={<Layout><NewsDetail /></Layout>} path="/news/:id" />
          <Route element={<Layout><Projects /></Layout>} path="/projects" />
          <Route element={<Layout><Events /></Layout>} path="/events" />
          <Route element={<Layout><Gallery /></Layout>} path="/gallery" />
          <Route element={<Layout><Contact /></Layout>} path="/contact" />
          <Route element={<Layout><FAQ /></Layout>} path="/faq" />

          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/admin/news" element={<PrivateRoute><AdminNews /></PrivateRoute>} />
          <Route path="/admin/projects" element={<PrivateRoute><AdminProjects /></PrivateRoute>} />
          <Route path="/admin/events" element={<PrivateRoute><AdminEvents /></PrivateRoute>} />
          <Route path="/admin/gallery" element={<PrivateRoute><AdminGallery /></PrivateRoute>} />
          <Route path="/admin/contacts" element={<PrivateRoute><AdminContacts /></PrivateRoute>} />
          <Route path="/admin/faq" element={<PrivateRoute><AdminFAQ /></PrivateRoute>} />
          <Route path="/admin/about" element={<PrivateRoute><AdminAbout /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
