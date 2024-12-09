import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WeatherApp from './components/weather';
import WeatherReport from './components/weatherReport';
import Login from './components/login';
import Register from './components/register';
import Navbar from './components/navbar';
import { Context, server } from './main';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

function App() {
  const { setUser, setIsAuthenticated, isAuthenticated } = useContext(Context);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${server}/users/me`, { withCredentials: true });
      setUser(response.data.user);
      setIsAuthenticated(true);
      console.log('User authenticated:', response.data.user);
    } catch (error) {
      setUser({});
      setIsAuthenticated(false);
      console.log('Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [setIsAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Toaster />
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/weather" />: <Register />} />
        <Route path="/weather" element={isAuthenticated ? <WeatherApp /> : <Navigate to="/login" />} />
        <Route path="/weatherReport" element={isAuthenticated ? <WeatherReport /> : <Navigate to="/login" />} />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
