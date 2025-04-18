import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { Toaster } from "react-hot-toast";


function App() {

  return (
    <>
     <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
