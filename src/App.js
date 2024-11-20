import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import ForumPage from './components/ForumPage';
import NewDiscussionPage from './components/NewDiscussionPage';
import ReplyDiscussionPage from './components/ReplyDiscussionPage';
import ProfilePage from './components/ProfilePage';
import InfoDetailPage from './components/InfoDetailPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AdminPage from './components/AdminPage';


function App() {
    return (
        <Router>
            <Routes>
                {/* Rute untuk Landing Page */}
                <Route path="/" element={<LandingPage />} />

                {/* Rute untuk Login Page */}
                <Route path="/login" element={<LoginPage />} />

                {/* Rute untuk Registration Page */}
                <Route path="/register" element={<RegisterPage />} />

                {/* Rute untuk Home Page */}
                <Route path="/home" element={<HomePage />} />

                {/* Rute untuk Forum Page */}
                <Route path="/forum" element={<ForumPage />} />

                {/* Rute untuk halaman Buat Diskusi Baru */}
                <Route path="/new-discussion" element={<NewDiscussionPage />} />

                {/* Rute untuk halaman Balas Diskusi, dengan parameter ID */}
                <Route path="/reply-discussion/:id" element={<ReplyDiscussionPage />} />

                {/* Rute untuk halaman Profile */}
                <Route path="/profile" element={<ProfilePage />} />

                {/* Rute untuk halaman Info Detail, dengan parameter ID */}
                <Route path="/info-detail/:id" element={<InfoDetailPage />} />

                {/* Rute Admin Page */}
                <Route path="/admin" element={<AdminPage />} />

                {/* Redirect untuk path yang tidak ada */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
