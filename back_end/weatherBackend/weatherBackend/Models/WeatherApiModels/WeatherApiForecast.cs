namespace weatherBackend.Models;

public class WeatherApiForecast
{
    public List<WeatherApiForecastDay> ForecastDay { get; set; } = [];
}

public class WeatherApiForecastDay
{
    public string Date { get; set; } =  string.Empty;
    public WeatherApiDay Day { get; set; }
}

public class WeatherApiDay
{
    public double MaxTemp_f { get; set; }
    public double MinTemp_f { get; set; }
    public WeatherApiCondition Condition { get; set; }
}

public class WeatherApiCondition
{
    public string Text { get; set; } = string.Empty;
}