import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is user
  const [error, setError] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        firstName,
        lastName,
        email,
        password,
        role,
      };

      const response = await axios.post('https://localhost:7161/api/User/AddUser', newUser);

      // Check if the user is registered successfully
      if (response.status === 200) {
        const registeredUser = response.data;

        if (registeredUser.role === 'admin') {
          // Admin registration
          history.push('/admin-dashboard'); // Redirect to the admin dashboard
        } else {
          // Regular user registration
          history.push('/user-dashboard'); // Redirect to the user dashboard
        }
      }
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={handleFirstNameChange} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={handleLastNameChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={handleRoleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
