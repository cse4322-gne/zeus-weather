using weatherBackend.DTOs;

namespace weatherBackend.Controllers;
using System;
using Microsoft.AspNetCore.Mvc;

public class WeatherController : ControllerBase
{
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
        
        // will catch any errors and report those back to the frontend if needed. 
        return Ok();
    }
}