using weatherBackend.Models;

namespace weatherBackend.DTOs;
public record ForecastDayDto(string Day, double High, double Low, string Condition);

public record ForecastResultDto(
       string City,
       double Temperature,
       string Condition,
       double High,
       double Low,
       int Humidity,
       double WindSpeed,
       List<ForecastDayDto> Forecast
);

public record GetUserSavedLocationsDto(SavedLocation[] SavedLocations);