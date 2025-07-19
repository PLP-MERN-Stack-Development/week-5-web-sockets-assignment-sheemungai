import React, { useState } from 'react';
import { UserIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }

    if (username.trim().length < 2) {
      toast.error('Username must be at least 2 characters long');
      return;
    }

    setLoading(true);

    try {
      // Simulate authentication process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        username: username.trim(),
        id: Date.now(),
        joinedAt: new Date().toISOString(),
      };

      onLogin(userData);
      toast.success(`Welcome, ${userData.username}!`);
    } catch (error) {
      toast.error('Failed to join chat');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Join Chat</h1>
          <p className="text-gray-600">Enter your username to start chatting</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your username"
                maxLength={20}
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Joining...
              </div>
            ) : (
              'Join Chat'
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Real-time chat powered by Socket.io</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
