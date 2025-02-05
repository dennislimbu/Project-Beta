import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Wrapper from './pages/Wrapper';

import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';

import AddEmployee from './pages/managerPages/AddEmployee';
import EmployeeList from './pages/managerPages/EmployeeList'; 
import Employee from './pages/managerPages/Employee';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Wrapper><Dashboard /></Wrapper>} />
        <Route path="/add-employee" element={<Wrapper><AddEmployee /></Wrapper>} />
        <Route path="/employees/list" element={<Wrapper><EmployeeList /></Wrapper>} /> {/* Added route for EmployeeList */}
        <Route path="/employees/add" element={<Wrapper><AddEmployee /></Wrapper>} /> 
        <Route path="/employee" element={<Wrapper><Employee /></Wrapper>} /> {/* Added route for AddEmployee */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;