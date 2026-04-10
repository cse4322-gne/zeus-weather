import React, { useState } from 'react';
import { Sun, Cloud, CloudRain, Search, Wind, Droplets, MapPin, Navigation } from 'lucide-react';
import type { WeatherData } from './types';

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
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Focus: Current Weather */}
        <section className="lg:col-span-8 space-y-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-900/20">
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative flex flex-col md:flex-row justify-between gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-100/80">
                  <MapPin size={18} />
                  <span className="text-lg font-medium uppercase tracking-widest">{weather.city}</span>
                </div>
                <h1 className="text-8xl md:text-9xl font-bold tracking-tighter">{weather.temperature}°</h1>
                <h2 className="border-4 border-red-500"></h2>
                <p className="text-2xl text-blue-100 font-light">{weather.condition}</p>
              </div>
              
              <div className="flex flex-col justify-between items-end">
                <Sun size={120} className="text-yellow-300 drop-shadow-[0_0_25px_rgba(253,224,71,0.4)]" />
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex gap-6 border border-white/10">
                  <div className="text-center">
                    <p className="text-xs text-blue-100/60 uppercase mb-1">High</p>
                    <p className="font-semibold">{weather.high}°</p>
                  </div>
                  <div className="w-px h-8 bg-white/10"></div>
                  <div className="text-center">
                    <p className="text-xs text-blue-100/60 uppercase mb-1">Low</p>
                    <p className="font-semibold">{weather.low}°</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Humidity', value: `${weather.humidity}%`, icon: Droplets, color: 'text-blue-400' },
              { label: 'Wind Speed', value: `${weather.windSpeed} mph`, icon: Wind, color: 'text-teal-400' },
              { label: 'Visibility', value: '10 mi', icon: Cloud, color: 'text-purple-400' },
              { label: 'UV Index', value: '4 Low', icon: Sun, color: 'text-orange-400' },
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
          <div className="space-y-8">
            {weather.forecast.map((item, index) => (
              <div key={index} className="flex justify-between items-center group cursor-default">
                <span className="text-slate-400 font-medium">{item.day}</span>
                <div className="flex items-center gap-4 flex-1 justify-center">
                  {item.condition === 'Sunny' && <Sun size={24} className="text-yellow-500" />}
                  {item.condition === 'Cloudy' && <Cloud size={24} className="text-slate-400" />}
                  {item.condition === 'Rainy' && <CloudRain size={24} className="text-blue-400" />}
                  <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden hidden md:block">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400" 
                      style={{ width: `${(item.temp/100)*100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="font-bold w-10 text-right">{item.temp}°</span>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-10 py-4 bg-slate-700/50 hover:bg-slate-700 rounded-2xl font-semibold transition-all">
            More Details
          </button>
        </section>

      </main>
    </div>
  );
};

export default WeatherDashboard;