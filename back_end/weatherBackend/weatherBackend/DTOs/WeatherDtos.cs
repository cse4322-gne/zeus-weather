using weatherBackend.Models;

namespace weatherBackend.DTOs;
// quick enum for the wind direction so we aren't manually typing it, and we can use this type on the front end as well
public enum WindDirection
{
       South,
       North,
       East,
       West
}

public record ForecastResultDto(int HighTemperature, 
       int LowTemperature, 
       int Humidity, 
       int WindSpeed, 
       WindDirection WindDirection, 
       double Visibility
       );

public record GetUserSavedLocationsDto(SavedLocation[] SavedLocations);