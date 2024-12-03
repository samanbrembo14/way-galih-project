import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import ForumPage from './components/ForumPage';
import VideosPage from './components/VideosPage';
import NewDiscussionPage from './components/NewDiscussionPage';
import ReplyDiscussionPage from './components/ReplyDiscussionPage';
import ProfilePage from './components/ProfilePage';
import InfoDetailPage from './components/InfoDetailPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AdminPage from './components/AdminPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';

// Fungsi untuk memeriksa autentikasi
const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode payload JWT
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp < now) {
            console.warn('Token telah kedaluwarsa.');
            localStorage.removeItem('token'); // Hapus token jika expired
            return false;
        }
        return true;
    } catch (err) {
        console.error('Token tidak valid:', err);
        localStorage.removeItem('token'); // Hapus token jika corrupt
        return false;
    }
};

// Fungsi untuk mendapatkan role dari token
const getRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode payload JWT
        console.log('Role dari token:', payload.role); // Debug role
        return payload.role;
    } catch (err) {
        console.error('Gagal membaca role dari token:', err);
        return null;
    }
};

// Komponen ProtectedRoute untuk melindungi akses halaman tertentu
const ProtectedRoute = ({ children, role }) => {
    if (!isAuthenticated()) {
        console.warn('Akses ditolak: Pengguna belum login.');
        return <Navigate to="/login" replace />;
    }

    if (role && getRole() !== role) {
        console.warn('Akses ditolak: Role tidak sesuai.');
        return <Navigate to="/" replace />;
    }

    return children;
};

function App() {
    return (
        <Router>
            <Routes>
                {/* Rute untuk Landing Page */}
                <Route path="/" element={<LandingPage />} />

                {/* Rute untuk Login Page */}
                <Route path="/login" element={<LoginPage />} />

                {/* Rute untuk lupa password */}
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                {/* Rute untuk reset password */}
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

                {/* Rute untuk Registration Page */}
                <Route path="/register" element={<RegisterPage />} />

                {/* Rute untuk Home Page */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute role="user">
                            <HomePage />
                        </ProtectedRoute>
                    }
                />

                {/* Rute untuk Forum Page */}
                <Route
                    path="/forum"
                    element={
                        <ProtectedRoute role="user">
                            <ForumPage />
                        </ProtectedRoute>
                    }
                />

                {/* Rute untuk Videos Page */}
                <Route
                    path="/videos"
                    element={
                        <ProtectedRoute role="user">
                            <VideosPage />
                        </ProtectedRoute>
                    }
                />

                {/* Rute untuk halaman Buat Diskusi Baru */}
                <Route
                    path="/new-discussion"
                    element={
                        <ProtectedRoute role="user">
                            <NewDiscussionPage />
                        </ProtectedRoute>
                    }
                />

                {/* Rute untuk halaman Balas Diskusi, dengan parameter ID */}
                <Route
                    path="/reply-discussion/:id"
                    element={
                        <ProtectedRoute role="user">
                            <ReplyDiscussionPage />
                        </ProtectedRoute>
                    }
                />

                {/* Rute untuk halaman Profile */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute role="user">
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />

                {/* Rute untuk halaman Info Detail, dengan parameter ID */}
                <Route
                    path="/info-detail/:id"
                    element={
                        <ProtectedRoute role="user">
                            <InfoDetailPage />
                        </ProtectedRoute>
                    }
                />

                {/* Rute Admin Page */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />

                {/* Redirect untuk path yang tidak ada */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
