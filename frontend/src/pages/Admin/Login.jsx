import React, { useState } from 'react';
import { login } from '../../services/authService'; 
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); 
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await login({ email, password });
            const { data: token, message } = response;
            // console.log('JWT Token:', token);
            // console.log('Message:', message);
            localStorage.setItem('token', token);



            navigate('/AdminPannel');

        } catch (err) {
            toast.error('Login failed. Please check your credentials.');

        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#202938]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-center text-2xl font-bold text-[#202938] mb-6">Login</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm text-[#202938] mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#e90028]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-[#202938] mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#e90028]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#e90028] text-white p-2 rounded hover:bg-[#d60025] transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-[#202938]">
                    Don't have an account? <a href="#" className="text-[#e90028]">Sign up</a>
                </p>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover />

        </div>
    );
};

export default Login;
