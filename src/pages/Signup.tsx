import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    name: formData.name,
                },
            },
        });

        setLoading(false);

        if (error) {
            setError(error.message);
        } else {
            alert('Signup successful! Check your email to confirm.');
            navigate('/');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name:
                        </label>
                        <Input type='text' id='name' name='name' value={formData.name} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email:
                        </label>
                        <Input type='email' id='email' name='email' value={formData.email} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password:
                        </label>
                        <Input type='password' id='password' name='password' value={formData.password} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password:
                        </label>
                        <Input type='password' id='confirmPassword' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} required/>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button type='submit' disabled={loading} className='w-full bg-green-600 hover:bg-green-700'>
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Signup;