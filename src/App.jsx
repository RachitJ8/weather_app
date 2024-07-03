import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch/CitySearch';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';
import './components/CitySearch/CitySearch.css';

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [theme, setTheme] = useState('light');

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  useEffect(() => {
    const fetchTimeAndSetTheme = async () => {
      if (selectedCity) {
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity.name}&appid=a49c789b1ed927bb8c1a36c552e43fef&units=metric`);
          const data = await response.json();
          const cityTime = new Date(data.dt * 1000 + data.timezone * 1000);
          const hours = cityTime.getUTCHours();
          if (hours >= 6 && hours < 18) {
            setTheme('light');
          } else {
            setTheme('dark');
          }
        } catch (error) {
          console.error('Failed to fetch time and set theme:', error);
        }
      }
    };

    fetchTimeAndSetTheme();
  }, [selectedCity]);

  return (
    <div className={`App ${theme}`}>
      <header className={`App-header ${theme}`}>
        <h1>Weather Dashboard</h1>
      </header>
      <div className="container">
        <CitySearch onCitySelect={handleCitySelect} theme={theme} />
        {selectedCity ? (
          <WeatherDisplay city={selectedCity} theme={theme} />
        ) : (
          <p className="select-city-message">Select a city to view the weather information</p>
        )}
      </div>
    </div>
  );
}

export default App;