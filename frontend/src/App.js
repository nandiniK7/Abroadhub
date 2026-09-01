import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './store/AuthContext';
import RequireAuth from './router/RequireAuth';
import HomePage from './features/home/HomePage';
import ExplorePage from './features/explore/ExplorePage';
import JobsPage from './features/jobs/JobsPage';
import PostJobPage from './features/jobs/PostJobPage';
import NearbyPage from './features/nearby/NearbyPage';
import AllCategoriesPage from './features/nearby/AllCategoriesPage';
import ProfilePage from './features/profile/ProfilePage';
import EditProfilePage from './features/profile/EditProfilePage';
import SettingsPage from './features/settings/SettingsPage';
import LoginPage from './features/auth/LoginPage';
import SignupPage from './features/auth/SignupPage';
import NotificationsPage from './features/notifications/NotificationsPage';
import InboxPage from './features/inbox/InboxPage';
import ChatPage from './features/inbox/ChatPage';
import SearchPage from './features/search/SearchPage';
import EventListingPage from './features/events/EventListingPage';
import { Toaster } from 'sonner';

const P = ({ children }) => <RequireAuth>{children}</RequireAuth>;

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<P><HomePage /></P>} />
            <Route path="/explore" element={<P><ExplorePage /></P>} />
            <Route path="/search" element={<P><SearchPage /></P>} />
            <Route path="/jobs" element={<P><JobsPage /></P>} />
            <Route path="/jobs/new" element={<P><PostJobPage /></P>} />
            <Route path="/nearby" element={<P><NearbyPage /></P>} />
            <Route path="/nearby/categories" element={<P><AllCategoriesPage /></P>} />
            <Route path="/notifications" element={<P><NotificationsPage /></P>} />
            <Route path="/inbox" element={<P><InboxPage /></P>} />
            <Route path="/inbox/:cid" element={<P><ChatPage /></P>} />
            <Route path="/events/new" element={<P><EventListingPage /></P>} />
            <Route path="/profile" element={<P><ProfilePage /></P>} />
            <Route path="/profile/edit" element={<P><EditProfilePage /></P>} />
            <Route path="/settings" element={<P><SettingsPage /></P>} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" richColors />
      </AuthProvider>
    </div>
  );
}

export default App;
