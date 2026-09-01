import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './store/AuthContext';
import RequireAuth from './router/RequireAuth';
import HomePage from './features/home/HomePage';
import ExplorePage from './features/explore/ExplorePage';
import JobsPage from './features/jobs/JobsPage';
import NearbyPage from './features/nearby/NearbyPage';
import ProfilePage from './features/profile/ProfilePage';
import LoginPage from './features/auth/LoginPage';
import SignupPage from './features/auth/SignupPage';
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<RequireAuth><HomePage /></RequireAuth>} />
            <Route path="/explore" element={<RequireAuth><ExplorePage /></RequireAuth>} />
            <Route path="/jobs" element={<RequireAuth><JobsPage /></RequireAuth>} />
            <Route path="/nearby" element={<RequireAuth><NearbyPage /></RequireAuth>} />
            <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" richColors />
      </AuthProvider>
    </div>
  );
}

export default App;
