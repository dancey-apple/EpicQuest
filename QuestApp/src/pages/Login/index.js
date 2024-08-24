import React, { useState } from 'react';
import NavBar from '../NavBar';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
   
    // handle API calls here
  };

  return (
    <>
    <NavBar></NavBar>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="p-8 bg-yellow-900 drop-shadow-gl rounded-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-center text-secondary mb-6">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-secondary">Username</label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary bg-secondary hover:bg-glow hover:drop-shadow-gl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
