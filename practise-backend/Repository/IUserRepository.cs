namespace practise_backend.Repository
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(int id);
        Task<User?> GetByNicknameAsync(string nickname);
        Task AddAsync(User user);
        void Delete(User user);
        Task SaveChangesAsync();
        Task<User?> GetByEmailAsync(string email); 
    }

}
