import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export const server = "http://localhost:5003";

// Create context with a more appropriate initial state
export const Context = createContext({
  isAuthenticated: false,
  user: {},
  logout: false,
  setIsAuthenticated: () => {},
  setUser: () => {},
  setLogout: () => {},
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logout, setLogout] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, logout, setLogout }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
