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
}