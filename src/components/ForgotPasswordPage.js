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
        <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('/Images/desa3.jpg')` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 flex items-center justify-center min-h-screen">
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
                    <button
                        onClick={() => window.history.back()}
                        className="mt-4 w-full py-2 px-4 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition duration-300"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
