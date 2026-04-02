using Microsoft.EntityFrameworkCore;

namespace weatherBackend.Models;

public class AppDbContext : DbContext
{
  public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}
