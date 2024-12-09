import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.title}>Weather App</h2>
      <div style={styles.links}>
        <Link style={styles.link} to="/weather">
          Weather
        </Link>
        <Link style={styles.link} to="/weatherReport">
          Weather Report
        </Link>
        <Link style={styles.link} to="/login">
          Login
        </Link>
        <Link style={styles.link} to="/register">
          Register
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: '10px 20px',
    color: 'white',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '8px 12px',
    border: '1px solid white',
    borderRadius: '4px',
    textAlign: 'center',
  },
};

export default Navbar;
