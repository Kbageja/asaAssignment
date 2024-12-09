import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context, server } from '../main'; // Ensure Context and server URL are imported correctly

const WeatherApp = () => {
  const { user, setUser } = useContext(Context); // Use setUser if you need to update user state
  const [query, setQuery] = useState('');
  const [userId, setuserId] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // Fetch user data on component mount


  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  
  
  const fetchWeather = async () => {
    try {
      setError(null); // Reset error state
  
      // Fetch weather data
      const response = await axios.get(`https://api.weatherstack.com/current`, {
        params: {
          access_key: '1bc75f72d08595054bd58a12679189ea', // Replace with your actual API key
          query: query,
        },
      });
      setWeather(response.data);
  
      // Fetch user and ensure `userId` is set
      const fetchedUserId = await fetchUser(); // Wait for fetchUser to complete
  
      if (fetchedUserId) {
        console.log("posting city with userId:", fetchedUserId);
        await axios.post(
          `${server}/users/userWeather`,
          {
            username: fetchedUserId,
            searchCity: query,
          },
          {
            withCredentials: true,
          }
        );
      } else {
        console.error("User ID is not available");
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch weather data or log search. Please try again later.');
      setWeather(null);
    }
  };
  
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${server}/users/me`, { withCredentials: true });
      console.log(res.data.user.username + " res");
      setuserId(res.data.user.username);
      return res.data.user.username; // Return userId directly
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      fetchWeather();
    }
  };

  // Inline styling for the component
  const appStyles = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '400px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const inputStyles = {
    padding: '10px',
    marginBottom: '10px',
    width: 'calc(100% - 22px)',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyles = {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const weatherCardStyles = {
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #eee',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
  };

  return (
    <div style={appStyles}>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a city"
          value={query}
          onChange={handleInputChange}
          style={inputStyles}
        />
        <button type="submit" style={buttonStyles}>Get Weather</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && weather.current && (
        <div style={weatherCardStyles}>
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} />
          <p><strong>Description:</strong> {weather.current.weather_descriptions[0]}</p>
          <p><strong>Temperature:</strong> {weather.current.feelslike} &#8451;</p>
          <p><strong>Precipitation:</strong> {weather.current.precip} mm</p>
          <p><strong>Humidity:</strong> {weather.current.humidity} %</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
