namespace weatherBackend.DTOs;

public record RegisterUserDto(string Email, string Password);

public record RegisterUserResponseDto(string Email, string JwtToken);

public record LoginUserDto(string Email, string Password);

public record LoginUserResponseDto(string JwtToken);
