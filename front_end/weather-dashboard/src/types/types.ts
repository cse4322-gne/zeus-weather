export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  high: number;
  low: number;
  humidity: number;
  windSpeed: number;
  forecast: Array<{
    day: string;
    temp: number;
    condition: 'Sunny' | 'Cloudy' | 'Rainy';
  }>;
}