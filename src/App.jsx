import React, { useState } from 'react';
import CitySearch from './components/CitySearch/CitySearch';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';
import './components/CitySearch/CitySearch.css';

function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Dashboard</h1>
      </header>
      <div className="container">
        <div className="left-section">
          <CitySearch onCitySelect={handleCitySelect} />
        </div>
        <div className="right-section">
          {selectedCity ? (
            <WeatherDisplay city={selectedCity} />
          ) : (
            <p>Select a city to view the weather information</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;