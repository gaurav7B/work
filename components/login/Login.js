import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7161/api/User/Login', {
        name,
        password,
      });

      const user = response.data;

      // Check if the login is successful
      if (response.status === 200) {
        // Redirect the user to the appropriate dashboard based on their role
        if (user.role === 'admin') {
          // Redirect to admin dashboard
          window.location.href = '/admin-dashboard';
        } else {
          // Redirect to user dashboard
          window.location.href = '/user-dashboard';
        }
      }
    } catch (error) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email Address:</label>
          <input type="text" value={name} onChange={handleNameChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
