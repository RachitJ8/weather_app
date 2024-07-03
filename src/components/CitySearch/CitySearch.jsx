import React, { useState } from 'react';

const CitySearch = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      try {
        const response = await fetch(`http://api.geonames.org/searchJSON?q=${query}&maxRows=10&username=rachitj8`);
        const data = await response.json();
        setCities(data.geonames);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    }
  };

  return (
    <div className="city-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
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