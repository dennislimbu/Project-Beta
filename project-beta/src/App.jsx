import React from 'react'
import {BrowserRouter, Routes, Route,} from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* {Home} */}
      <Route path="/" element={<Home/>}/>

      {/* {register} */}
      <Route path="/register" element={<Register/>}/>

      {/* {login} */}
      <Route path="/login" element={<Login/>}/>

      {/* {Dashboard} */}
      <Route path="/dashboard" element={<Dashboard/>}/>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
