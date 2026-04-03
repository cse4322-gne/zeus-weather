using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using weatherBackend.DTOs;
using weatherBackend.Models;
using weatherBackend.Services;

namespace weatherBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _dbContext;
    private readonly PasswordHasher<User> _passwordHasher;
    private readonly JwtService _jwtService;

    public AuthController(AppDbContext dbContext, PasswordHasher<User> passwordHasher, JwtService jwtService)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _jwtService = jwtService;
    }

    [HttpPost("RegisterUser")]
    public async Task<ActionResult<RegisterUserResponseDto>> Register([FromBody] RegisterUserDto request)
    {
        var user = new User { 
            Email = request.Email,
            Password = request.Password,
        };
        var hashedPassword = _passwordHasher.HashPassword(user, request.Password);
        user.Password = hashedPassword;
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();
        return new RegisterUserResponseDto(user.Email, _jwtService.CreateToken(user));
    }

    [HttpPost("LoginUser")]
    public async Task<ActionResult<LoginUserResponseDto>> Login([FromBody] LoginUserDto request)
    {
        var user = await _dbContext.Users
            .Where(x => x.Email == request.Email)
            .FirstOrDefaultAsync();
        if (user == null)
        {
            return NotFound("Couldn't find user with associated email.");
        }

        var result = _passwordHasher.VerifyHashedPassword(user, user.Password, request.Password);
        return result == PasswordVerificationResult.Failed
            ? NotFound("Invalid credentials")
            : Ok(new LoginUserResponseDto(_jwtService.CreateToken(user)));
    }
}