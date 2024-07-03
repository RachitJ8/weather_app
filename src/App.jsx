import React, { useState } from 'react';
import CitySearch from './components/CitySearch/CitySearch';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

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
      <CitySearch onCitySelect={handleCitySelect} />
      <main className="container">
        {selectedCity ? (
          <WeatherDisplay city={selectedCity} />
        ) : (
          <p>Select a city to view the weather information</p>
        )}
      </main>
    </div>
  );
}

export default App;