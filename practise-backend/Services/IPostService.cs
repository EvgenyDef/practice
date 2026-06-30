namespace practise_backend.Services
{
    public interface IPostService
    {
        Task<Post?> GetByIdAsync(int id);
        Task<List<Post>> GetFeedAsync(); 
        Task<Post> CreateAsync(Post post);
        Task<bool> DeleteAsync(int id);
    }
}