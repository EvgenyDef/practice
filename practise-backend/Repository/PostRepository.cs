
using Microsoft.EntityFrameworkCore;
using practise_backend.Repository;

public class PostRepository(ApplicationContext context) : IPostRepository
{
    private readonly ApplicationContext context = context;

    public async Task AddAsync(Post post)
    {
        await context.Posts.AddAsync(post);
    }

    public void Delete(Post post)
    {
        context.Posts.Remove(post);
    }

    public async Task<Post?> GetByIdAsync(int id)
    {
        return await context.Posts.FindAsync(id);
    }

    public async Task SaveChangesAsync()
    {
        await context.SaveChangesAsync();
    }

            public async Task<List<Post>> GetAllWithUsersAsync()
        {
            return await context.Posts
                .Include(p => p.User)
                .OrderByDescending(p => p.PublishDate)
                .ToListAsync();
        }
}