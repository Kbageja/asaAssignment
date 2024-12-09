import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Context, server } from '../main';

const WeatherReport = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`${server}/users/Weathers`);
        if (response.data.success) {
          setWeatherData(response.data.data);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Weather Report</h2>
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Search City</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.username}</td>
              <td>{entry.searchCity}</td>
              <td>{new Date(entry.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherReport;
