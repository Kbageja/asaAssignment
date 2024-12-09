import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/LoginForm.css';
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${server}/users/userlogin`, { email, password }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      
      console.log('Login response:', data);
      toast.success(data.message);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        console.log('Error response:', error.response);
        toast.error(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        console.log('Error request:', error.request);
        toast.error('No response received from the server');
      } else {
        console.log('Unexpected error:', error);
        toast.error('An unexpected error occurred');
      }
      setIsAuthenticated(false);
    }
  };



  if (isAuthenticated) return <Navigate to="/weather" />;

  return (
    <>
      <div className="applogin">
        <div className="blur-backgroundlogin"></div>
        <div className="contact-form-container form-container-login">
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
