namespace weatherBackend.Models;

public class WeatherApiCurrent
{
    public double Temp_F { get; set; } 
    public int Humidity { get; set; }
    public double Wind_Mph { get; set; }
    public string Wind_Dir { get; set; }
    public WeatherApiCondition Condition { get; set; } 
    
}