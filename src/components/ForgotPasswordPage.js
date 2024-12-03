import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('Format email tidak valid.');
            setMessage('');
            return;
        }

        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            setMessage(response.data.message);
        } catch (err) {
            console.error('Error sending reset password email:', err);
            setError(err.response?.data?.error || 'Terjadi kesalahan.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">Lupa Password</h1>
                {message && <p className="text-green-500 mb-4">{message}</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-sm font-bold">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                        placeholder="Masukkan email Anda"
                        required
                    />
                    <button
                        type="submit"
                        className={`px-4 py-2 rounded w-full ${
                            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Mengirim...' : 'Kirim Tautan Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
