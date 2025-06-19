import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login: React.FC = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        setLoading(false);

        if (error) {
            setError(error.message);
        } else {
            navigate('/home');
        }
    };

    return (
        <>
            <header className="bg-white/80 backdrop-blur-sm border-b border-border/20 p-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">M</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-foreground">MediCare Companion</h1>
                        </div>
                    </div>
                </div>
            </header>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login Page</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email:
                            </label>
                            <Input type='email' id="email" name='email' onChange={handleChange} value={formData.email} required />

                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password:
                            </label>
                            <Input type='password' id="password" name='password' onChange={handleChange} value={formData.password} required />
                        </div>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <Button type='submit' disabled={loading} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                        <Button type='submit' disabled={loading} className="w-full mt-6 bg-white border border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 py-3 text-lg" onClick={() => navigate('/signup')} >
                            Sign up
                        </Button>
                    </form>
                </div>
            </div>
        </>

    );
};

export default Login;