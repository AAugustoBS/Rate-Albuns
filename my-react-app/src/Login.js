import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {  Link, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'; 



export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [serverError, setServerError] = useState(''); 
  const { login } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async e => {
    e.preventDefault();
    const tokenData = await loginUser({ email, password });
    if (tokenData) {
      login(tokenData.token, tokenData.userName);
      navigate('/');
    }
  }


  async function loginUser(credentials) {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Failed to login');
        setServerError("User or password incorrect");
        return null;
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setServerError(error.message);
      return null;
    }
  }

  return (
    <div className="flex flex-row w-full h-screen">
      <div className="basis-2/4"></div>
      <div className="basis-1/4">
        <div className="flex flex-col h-full">
          <div className="basis-2/4"></div>
          <div className="flex flex-col bg-stone-900 rounded shadow-xl h-full">
            <div className="flex h-14 items-center justify-center">
              <h1 className="text-white font-sans text-2xl">Sign In</h1>
            </div>
            <div className="flex-1 h-14 gap-8 flex items-center justify-center">
              <form className="flex flex-col w-full h-full gap-12 px-24 pt-12" onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="email" className="w-full text-white px-4 py-2 border-b border-gray-300 bg-transparent rounded-none focus:outline-none focus:border-gray-500 focus:border-t-0" onChange={e => setEmail(e.target.value)} />
                <input type="password" name="password" placeholder="password" className="w-full text-white px-4 py-2 border-b border-gray-300 bg-transparent rounded-none focus:outline-none focus:border-gray-500 focus:border-t-0" onChange={e => setPassword(e.target.value)} />
                {serverError && <div style={{color: 'red'}}>{serverError}</div>}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Log In</button>
              </form>
            </div>
            <div className="flex h-14 items-center justify-center">
              <h2 className="text-white"> New Here? <Link to="/register"><a href='/register' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</a></Link></h2>
            </div>
          </div>
          <div className="basis-2/4"></div>
        </div>
      </div>
      <div className="basis-2/4"></div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};