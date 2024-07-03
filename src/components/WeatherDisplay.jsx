import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, Title, Tooltip, Legend } from 'chart.js/auto';
import { LineElement, BarElement, CategoryScale, LinearScale } from 'chart.js';

Chart.register(LineElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const WeatherDisplay = ({ city, theme }) => {
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
        setError(null);
      } catch (error) {
        setError(error.message);
        console.error('Failed to fetch weather data:', error);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  if (!city) {
    return <div className="container">Select a city to view weather</div>;
  }

  if (!weather && !error) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  // Determine dynamic colors based on theme
  const temperatureBackgroundColor = theme === 'light' ? 'rgba(255,99,132,0.2)' : 'rgba(255,99,132,0.6)';
  const temperatureBorderColor = theme === 'light' ? 'rgba(255,99,132,1)' : 'rgba(255,99,132,0.8)';
  const humidityBackgroundColor = theme === 'light' ? 'rgba(54, 162, 235, 0.2)' : 'rgba(54, 162, 235, 0.6)';
  const humidityBorderColor = theme === 'light' ? 'rgba(54, 162, 235, 1)' : 'rgba(54, 162, 235, 0.8)';

  const temperatureData = {
    labels: ['Temperature'],
    datasets: [
      {
        label: 'Temperature (°C)',
        backgroundColor: temperatureBackgroundColor,
        borderColor: temperatureBorderColor,
        borderWidth: 1,
        hoverBackgroundColor: temperatureBackgroundColor,
        hoverBorderColor: temperatureBorderColor,
        data: [weather.main.temp]
      }
    ]
  };

  const humidityData = {
    labels: ['Humidity'],
    datasets: [
      {
        label: 'Humidity (%)',
        backgroundColor: humidityBackgroundColor,
        borderColor: humidityBorderColor,
        borderWidth: 1,
        hoverBackgroundColor: humidityBackgroundColor,
        hoverBorderColor: humidityBorderColor,
        data: [weather.main.humidity]
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value',
          color: theme === 'light' ? '#333' : '#fff'
        },
        ticks: {
          color: theme === 'light' ? '#333' : '#fff'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Category',
          color: theme === 'light' ? '#333' : '#fff'
        },
        ticks: {
          color: theme === 'light' ? '#333' : '#fff'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: theme === 'light' ? '#333' : '#fff'
        }
      }
    }
  };

  return (
    <div className={`weather-display ${theme}`}>
      <div className={`weather-info weather-card ${theme}`}>
        <h2>{weather.name}</h2>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Feels Like: {weather.main.feels_like}°C</p>
        <p>Max Temperature: {weather.main.temp_max}°C</p>
        <p>Min Temperature: {weather.main.temp_min}°C</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Pressure: {weather.main.pressure} hPa</p>
        <p>Wind Speed: {weather.wind.speed} m/s</p>
        <p>Wind Direction: {weather.wind.deg}°</p>
        <p>Description: {weather.weather[0].description}</p>
      </div>
      <div className="chart-container">
        <div className={`chart ${theme}`}>
          <Line
            data={temperatureData}
            options={{
              ...options,
              scales: {
                ...options.scales,
                y: {
                  ...options.scales.y,
                  title: {
                    ...options.scales.y.title,
                    display: true,
                    text: 'Temperature (°C)',
                  },
                  ticks: {
                    ...options.scales.y.ticks,
                    beginAtZero: true
                  }
                }
              }
            }}
          />
        </div>
        <div className={`chart ${theme}`}>
          <Bar
            data={humidityData}
            options={{
              ...options,
              scales: {
                ...options.scales,
                y: {
                  ...options.scales.y,
                  title: {
                    ...options.scales.y.title,
                    display: true,
                    text: 'Humidity (%)',
                  },
                  ticks: {
                    ...options.scales.y.ticks,
                    beginAtZero: true
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;