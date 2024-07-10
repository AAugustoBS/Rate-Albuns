import React, {useState} from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated line
import Register from './Register'; // Ensure correct import paths
import Login from './Login'; // Ensure correct import paths
import Main from './Main'; // Ensure correct import paths
import Header from './components/Header'; // Ensure correct import paths
import { AuthProvider } from './AuthContext';
function App() {
  
  return (
    <AuthProvider>
    <Router>
      
      <div id="app" className="flex flex-col h-screen w-screen bg-zinc-800">
          <Header />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Main />} />
          </Routes>
      </div>
      
    </Router>
    </AuthProvider>
   
  );
}

export default App;