import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, Title, Tooltip, Legend } from 'chart.js/auto';
import { LineElement, BarElement, CategoryScale, LinearScale } from 'chart.js';

Chart.register(LineElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const WeatherDisplay = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=a49c789b1ed927bb8c1a36c552e43fef&units=metric`);
        if (!response.ok) {
          throw new Error('Weather data not available');
        }
        const data = await response.json();
        setWeather(data);
        updateTheme(data);
        setError(null); // Reset error state on successful fetch
      } catch (error) {
        setError(error.message);
        console.error('Failed to fetch weather data:', error);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  const updateTheme = (data) => {
    const currentTime = new Date((data.dt + data.timezone) * 1000);
    const sunriseTime = new Date((data.sys.sunrise + data.timezone) * 1000);
    const sunsetTime = new Date((data.sys.sunset + data.timezone) * 1000);
    const isDayTime = currentTime >= sunriseTime && currentTime < sunsetTime;
    document.body.className = isDayTime ? 'light' : 'dark';
  };

  if (!city) {
    return <div className="container">Select a city to view weather</div>;
  }

  if (!weather && !error) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  const temperatureData = {
    labels: ['Temperature'],
    datasets: [
      {
        label: 'Temperature (°C)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [weather.main.temp]
      }
    ]
  };

  const humidityData = {
    labels: ['Humidity'],
    datasets: [
      {
        label: 'Humidity (%)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data: [weather.main.humidity]
      }
    ]
  };

  return (
    <div className="container">
      <div className="weather-info">
        <h2>{weather.name}</h2>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind Speed: {weather.wind.speed} m/s</p>
        <p>Description: {weather.weather[0].description}</p>
      </div>
      <div className="chart">
        <Line
          data={temperatureData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Temperature (°C)',
                },
              },
            },
          }}
        />
      </div>
      <div className="chart">
        <Bar
          data={humidityData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Humidity (%)',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default WeatherDisplay;