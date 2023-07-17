import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7161/api/User/GetUserById/${id}`);
  
      if (response.status === 200) {
        const userData = response.data;
        setUser(userData);
      }
    } catch (error) {
      setError('Failed to fetch user');
    }
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      {error && <p>{error}</p>}
      {user && (
        <div>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
          {/* Display additional user-specific information here */}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
