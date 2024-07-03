import React, { useState } from 'react';
import './CitySearch.css';

const CitySearch = ({ onCitySelect, theme }) => {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      try {
        const response = await fetch(`http://api.geonames.org/searchJSON?q=${query}&maxRows=5&username=rachitj8`);
        const data = await response.json();
        setCities(data.geonames);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    }
  };

  const handleClear = () => {
    setCities([]);
    setQuery("");
    onCitySelect("");
  };

  return (
    <div className={`city-search ${theme}`}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
        <button 
          type="button" 
          disabled={cities.length === 0} 
          onClick={handleClear}
        >
          Clear
        </button>
      </form>
      <ul>
        {cities.map((city) => (
          <li key={city.geonameId} onClick={() => onCitySelect(city)}>
            {city.name}, {city.countryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySearch;