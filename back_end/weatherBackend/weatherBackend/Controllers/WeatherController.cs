using Microsoft.AspNetCore.WebUtilities;
using weatherBackend.DTOs;
using weatherBackend.Models;

namespace weatherBackend.Controllers;
using System;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;

    public WeatherController(IHttpClientFactory factory)
    {
        _httpClientFactory = factory;
    }
    
    [HttpGet("GetUserLocations/{id}")]
    public async Task<ActionResult<GetUserSavedLocationsDto>> GetUserSavedLocations(int id)
    {
        // querying the db for the users saved locations 
        return Ok();
    }

    [HttpGet("GetForecast/{locationName}")]
    public async Task<ActionResult<ForecastResultDto>> GetForecast(string locationName)
    {
        // will take the location name, and then make it a query parameter for calling the weather api
        var client = _httpClientFactory.CreateClient("weather");
        var weatherKey = Environment.GetEnvironmentVariable("Weather_Api_Key");
        if (string.IsNullOrEmpty(weatherKey))
        {
            throw new InvalidOperationException("weatherKey is missing");
        }
        
        var queryParams = new Dictionary<string, string?>
        {
            ["q"] = locationName,
            ["key"] = weatherKey,
            ["days"] = "7",
            ["day_fields"] = "temp_c,wind_mph"
        };
        
        var url = QueryHelpers.AddQueryString("forecast.json", queryParams);
        var response = await client.GetAsync(url);
        var output = await response.Content.ReadFromJsonAsync<WeatherApiResponse>();
        Console.WriteLine(output);
        // will catch any errors and report those back to the frontend if needed. 
        return Ok(output);
    }
}