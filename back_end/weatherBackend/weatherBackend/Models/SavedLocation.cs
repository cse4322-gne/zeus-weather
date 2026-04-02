namespace weatherBackend.Models;

public class SavedLocation
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int LocationId  { get; set; }
    public DateTime CreatedAt { get; set; }
}