namespace weatherBackend.Models;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }
    public DbSet<User> Users { get; set; }
    public DbSet<SavedLocation> SavedLocations { get; set; }
    public DbSet<Locations> Locations { get; set; }
    
}