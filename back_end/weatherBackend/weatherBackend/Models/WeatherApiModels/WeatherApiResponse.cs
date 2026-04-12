namespace weatherBackend.Models;

public class WeatherApiResponse
{
    public WeatherApiLocation Location { get; set; }
    public WeatherApiCurrent Current { get; set; }
    public WeatherApiForecast Forecast { get; set; }
}

