import React, { useState } from 'react';
import { Sun, Cloud, CloudRain, Search, Wind, Droplets, MapPin, Navigation } from 'lucide-react';
import type { WeatherData } from '../types';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import { ProtectedRoute } from '../components/ProtectedRoute';
// this is the previous code from app.tsx
const WeatherDashboard: React.FC = () => {
  const [search, setSearch] = useState('');

  // Enhanced Mock Data
  const [weather] = useState<WeatherData>({
    city: "San Francisco",
    temperature: 72,
    condition: "Partly Cloudy",
    high: 75,
    low: 62,
    humidity: 45,
    windSpeed: 12,
    forecast: [
      { day: 'Mon', temp: 70, condition: 'Sunny' },
      { day: 'Tue', temp: 68, condition: 'Cloudy' },
      { day: 'Wed', temp: 74, condition: 'Sunny' },
      { day: 'Thu', temp: 65, condition: 'Rainy' },
      { day: 'Fri', temp: 62, condition: 'Rainy' },
    ]
  });

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
