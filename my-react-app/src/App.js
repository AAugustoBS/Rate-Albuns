import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated line
import Register from './Register'; // Ensure correct import paths
import Login from './Login'; // Ensure correct import paths
import Main from './Main'; // Ensure correct import paths
import Header from './components/Header'; // Ensure correct import paths
import Result from './Result'; 
import Artist from './Artist'; // Ensure correct import paths
import { AuthProvider } from './AuthContext';
function App() {
  
  return (
    <AuthProvider>
    <Router>
      
      <div id="app" className="flex flex-col static overflow-x-hidden max-h-screen max-w-screen bg-zinc-800">
          <Header />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/result/:query" element={<Result />} />
            <Route path="/" element={<Main />} />
            <Route path="/artist/:artistName" element={<Artist />} />
          </Routes>
      </div>
      
    </Router>
    </AuthProvider>
   
  );
}

export default App;