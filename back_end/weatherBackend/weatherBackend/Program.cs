// See https://aka.ms/new-console-template for more information

using Microsoft.EntityFrameworkCore;
using weatherBackend.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

//this is where I am adding the DB context 
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


var app = builder.Build();

// have this here for automatically doing the migrations when the app starts up if it sees that one is needed
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();