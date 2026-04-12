import React, { useState } from 'react';
import { Sun, Cloud, CloudRain, Search, Wind, Droplets, MapPin, Navigation, LogOut } from 'lucide-react';
import type { WeatherData } from '../types/types';
import { logout } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { getForecast } from '../lib/weather';

/**
 * This is the home page of the application, the one that users can search for weather from. 
 */


export const HomePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getWeatherIcon = (condition: string, size = 24, className = '') => {
    const normalizedCondition = condition.toLowerCase();

    if (normalizedCondition.includes('rain') || normalizedCondition.includes('drizzle')) {
      return <CloudRain size={size} className={`text-blue-400 ${className}`.trim()} />;
    }

    if (normalizedCondition.includes('cloud') || normalizedCondition.includes('overcast')) {
      return <Cloud size={size} className={`text-slate-200 ${className}`.trim()} />;
    }

    return <Sun size={size} className={`text-yellow-300 ${className}`.trim()} />;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = async () => {
    const trimmedSearch = search.trim();

    if (!trimmedSearch) {
      setError('Search for a location to see the forecast.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getForecast(trimmedSearch);
      setWeather(response);
    } catch (error: any) {
      setWeather(null);
      setError(error.message || 'Unable to load weather for that location.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-[#1e293b] to-[#0f172a] text-slate-100 p-4 md:p-10 font-sans">
      
      {/* Header / Search Area */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/20">
            <Navigation className="text-white" size={24} fill="currentColor" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Zeus</h2>
        </div>

        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
          <input 
            type="text"
            placeholder="Search for a city..."
            className="w-full bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                void handleSearch();
              }
            }}
          />
          <button
            onClick={() => void handleSearch()}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-400"
          >
            Search
          </button>
        </div>
      </header>

      {error && (
        <div className="mx-auto mb-6 max-w-6xl rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Focus: Current Weather */}
        <section className="lg:col-span-8 space-y-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-900/20">
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative flex flex-col md:flex-row justify-between gap-8">
              {weather ? (
                <>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-blue-100/80">
                      <MapPin size={18} />
                      <span className="text-lg font-medium uppercase tracking-widest">{weather.city}</span>
                    </div>
                    <h1 className="text-8xl md:text-9xl font-bold tracking-tighter">{Math.round(weather.temperature)}°</h1>
                    <p className="text-2xl text-blue-100 font-light">{weather.condition}</p>
                  </div>
                  
                  <div className="flex flex-col justify-between items-end">
                    {getWeatherIcon(
                      weather.condition,
                      120,
                      'drop-shadow-[0_0_25px_rgba(253,224,71,0.35)]'
                    )}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex gap-6 border border-white/10">
                      <div className="text-center">
                        <p className="text-xs text-blue-100/60 uppercase mb-1">High</p>
                        <p className="font-semibold">{Math.round(weather.high)}°</p>
                      </div>
                      <div className="w-px h-8 bg-white/10"></div>
                      <div className="text-center">
                        <p className="text-xs text-blue-100/60 uppercase mb-1">Low</p>
                        <p className="font-semibold">{Math.round(weather.low)}°</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-blue-100/70">Weather Search</p>
                  <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                    {isLoading ? 'Loading forecast...' : 'Search for a location'}
                  </h1>
                  <p className="max-w-xl text-lg text-blue-100/80">
                    {isLoading
                      ? 'Getting the latest weather data for your selected city.'
                      : 'Search for a city to see the current conditions and weekly forecast.'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Humidity', value: weather ? `${weather.humidity}%` : '--', icon: Droplets, color: 'text-blue-400' },
              { label: 'Wind Speed', value: weather ? `${Math.round(weather.windSpeed)} mph` : '--', icon: Wind, color: 'text-teal-400' },
              { label: 'Wind Direction', value: weather?.windDirection ?? '--', icon: Navigation, color: 'text-purple-400' },
              { label: 'Conditions', value: weather?.condition ?? '--', icon: Sun, color: 'text-orange-400' },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 p-6 rounded-3xl hover:bg-slate-800/50 transition-colors">
                <stat.icon size={20} className={`${stat.color} mb-3`} />
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sidebar: Forecast */}
        <section className="lg:col-span-4 bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] p-8 shadow-xl">
          <h3 className="text-xl font-bold mb-8">Weekly Forecast</h3>
          {weather ? (
            <div className="space-y-8">
              {weather.forecast.map((item, index) => (
                <div key={index} className="flex items-center justify-between gap-4 group cursor-default">
                  <span className="w-12 text-slate-400 font-medium">{item.day}</span>
                  <div className="flex items-center gap-4 flex-1 justify-center">
                    {getWeatherIcon(item.condition)}
                    <div className="hidden min-w-0 flex-1 md:block">
                      <p className="truncate text-sm text-slate-300">{item.condition}</p>
                    </div>
                  </div>
                  <span className="whitespace-nowrap font-bold text-right">{Math.round(item.high)}° / {Math.round(item.low)}°</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/20 p-8 text-center text-slate-400">
              {isLoading ? 'Loading forecast...' : 'Search for a location to see the weekly forecast.'}
            </div>
          )}
        </section>

      </main>
      <div className='flex items-center justify-center p-3'>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
