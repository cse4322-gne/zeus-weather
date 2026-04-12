// export interface WeatherData {
//   city: string;
//   temperature: number;
//   condition: string;
//   high: number;
//   low: number;
//   humidity: number;
//   windSpeed: number;
//   forecast: Array<{
//     day: string;
//     temp: number;
//     condition: 'Sunny' | 'Cloudy' | 'Rainy';
//   }>;
// }

export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  high: number;
  low: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
  }>;
}

export interface WeatherApiResponse {
  location: {
    name: string;
  };
  current: {
    temp_F: number;
    humidity: number;
    wind_Mph: number;
    wind_Dir: string;
    condition: {
      text: string;
    };
  };
  forecast: {
    forecastDay: Array<{
      date: string;
      day: {
        maxTemp_f: number;
        minTemp_f: number;
        condition: {
          text: string;
        };
      };
    }>;
  };
}