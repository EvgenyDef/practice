namespace practise_backend.Repository
{
    public interface IPostRepository
    {
        Task<Post?> GetByIdAsync(int id);

        Task AddAsync(Post post);
        void Delete(Post post);
        Task SaveChangesAsync();
        Task<List<Post>> GetAllWithUsersAsync();

    }

}
