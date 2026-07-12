using Microsoft.EntityFrameworkCore;
using practise_backend.Repository;

public class UserRepostory : IUserRepository
{
    private readonly ApplicationContext context;

    public UserRepostory(ApplicationContext context)
    {
        this.context = context;
    }

    public async Task AddAsync(User user)
    {
        await context.Users.AddAsync(user);
    }

    public void Delete(User user)
    {
        context.Users.Remove(user);
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        return await context.Users.FindAsync(id);
    }

    public async Task<User?> GetByNicknameAsync(string nickname)
    {
        return await context.Users.FirstOrDefaultAsync(u => Equals(u.Nickname, nickname));
    }

    public async Task SaveChangesAsync()
    {
        await context.SaveChangesAsync();
    }

    public async Task<User?> GetByEmailAsync(String email)
    {
        return await context.Users.FirstOrDefaultAsync(user => Equals(user.Email, email));
    }
}