using weatherBackend.Models;

namespace weatherBackend.DTOs;

public class GetUserSavedLocationsDto
{
    public required SavedLocation[] SavedLocations { get; set; }
}