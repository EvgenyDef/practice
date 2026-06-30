public interface IUserService
{
    Task<User?> GetByIdAsync(int id);
    Task<User> RegisterAsync(RegisterRequestDto user);
    Task<User?> AuthenticateAsync(string nickname, string password);
}