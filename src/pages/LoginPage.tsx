import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Car } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email);
    if (!success) {
      setError('Invalid email. Try alice@example.com or ben@example.com');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center mb-6 text-blue-600">
          <Car size={48} />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-center text-gray-800">UniRide</h1>
        <p className="mb-8 text-center text-gray-600">Student-to-student ride sharing</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">University Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
              placeholder="e.g. alice@example.com"
              required
            />
          </div>
          
          {error && <p className="text-sm text-red-500">{error}</p>}
          
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <p className="font-semibold mb-1">Demo accounts:</p>
          <p>Rider: alice@example.com</p>
          <p>Driver: ben@example.com</p>
        </div>
      </div>
    </div>
  );
};
