import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://localhost:7161/api/User/GetUser');
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      setError('Failed to fetch users');
    }
  };

  const handleEdit = async (id) => {
    // Find the user to be edited from the users list
    const userToEdit = users.find((user) => user.id === id);

    try {
      const response = await axios.put(`https://localhost:7161/api/User/UpdateUser/${id}`, userToEdit);
      if (response.status === 200) {
        // Update the user in the users list
        const updatedUsers = users.map((user) => {
          if (user.id === id) {
            return response.data; // Use the updated user from the response
          }
          return user;
        });
        setUsers(updatedUsers);
      }
    } catch (error) {
      setError('Failed to update user');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://localhost:7161/api/User/DeleteUser/${id}`);
      if (response.status === 200) {
        // Remove the deleted user from the users list
        setUsers(users.filter((user) => user.id !== id));
      }
    } catch (error) {
      setError('Failed to delete user');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
