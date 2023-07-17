import React from 'react';
import AdminDashboard from './components/admin/AdminDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import UserDashboard from './components/user/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

const App = () => {
  return (
    <Router>      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>

    //-----------Test AREA-------------------------//
    // <div>
    //   <AdminDashboard/>
    // </div>
  );
};

export default App;
