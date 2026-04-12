import type { WeatherApiResponse, WeatherData } from "../types/types";
import { formatDay } from "../utils";
import { API_BASE } from "./auth"


/** 
 * This is going to be the file where we are going to be making requests to the weather controller 
 */
export const getForecast = async (cityName: string): Promise<WeatherData> => {
    const result  = await fetch(`${API_BASE}/api/Weather/GetForecast/${cityName}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!result.ok) {
    const errorText = await result.text();
    throw new Error(errorText || 'Getting forecast failed');
    }

    const data: WeatherApiResponse = await result.json();

    console.log("data: ", data);
    const today = data.forecast.forecastDay[0];

    return {
        city: data.location.name,
        temperature: data.current.temp_F,
        condition: data.current.condition.text,
        high: today.day.maxTemp_f,
        low: today.day.minTemp_f,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_Mph,
        windDirection: data.current.wind_Dir,
        forecast: data.forecast.forecastDay.map((item) => ({
        day: formatDay(item.date),
        high: item.day.maxTemp_f,
        low: item.day.minTemp_f,
        condition: item.day.condition.text,
        })),
    };
}
