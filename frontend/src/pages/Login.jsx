import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setUser }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/users/login", formData);
            localStorage.setItem("token", res.data.token);
            setUser(res.data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80')" }}>
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 bg-white/80 backdrop-blur-md p-10 rounded-[2rem] shadow-2xl w-full max-w-md border border-white/20">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Welcome <span className="text-blue-600">Back</span></h2>
                    <p className="text-gray-600 mt-2">Sign in to access exclusive listings</p>
                </div>

                {error && <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-4 text-sm font-medium text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Email Address</label>
                        <input className="w-full p-4 bg-white/50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all" 
                            type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@company.com" required />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">Password</label>
                        <input className="w-full p-4 bg-white/50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all" 
                            type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required />
                    </div>

                    <button className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold text-lg hover:bg-gray-900 shadow-xl transition-all active:scale-95">
                        Sign In
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-600">
                    New to Luxe Estates? <Link to="/register" className="text-blue-600 font-bold hover:underline">Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;