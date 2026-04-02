namespace weatherBackend.Models;

public class Locations
{
    public int  Id { get; set; }
    public required string CityName { get; set; }
    public required string CountryName { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}