// import React from 'react';

interface City {
  name: string;
  latitude: number;
  longitude: number;
}

interface SelectorUIProps {
  cities: City[];
  selectedCity: string;
  onCityChange: (cityName: string) => void;
}

export default function SelectorUI({ cities, selectedCity, onCityChange }: SelectorUIProps) {
  return (
    <select
      value={selectedCity}
      onChange={(e) => onCityChange(e.target.value)}
      style={{ width: '100%', padding: '8px', fontSize: '16px' }}
    >
      {cities.map((city) => (
        <option key={city.name} value={city.name}>
          {city.name}
        </option>
      ))}
    </select>
  );
}
