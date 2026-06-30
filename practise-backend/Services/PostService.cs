using practise_backend.Repository;

namespace practise_backend.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository postRepository;

        public PostService(IPostRepository postRepository)
        {
            this.postRepository = postRepository;
        }

        public async Task<Post?> GetByIdAsync(int id)
        {
            return await postRepository.GetByIdAsync(id);
        }

        public async Task<List<Post>> GetFeedAsync()
        {
            return await postRepository.GetAllWithUsersAsync();
        }

        public async Task<Post> CreateAsync(Post post)
        {
            if (string.IsNullOrWhiteSpace(post.Text))
            {
                throw new ArgumentException("Текст публикации не может быть пустым");
            }

            post.PublishDate = DateTime.UtcNow;

            await postRepository.AddAsync(post);
            await postRepository.SaveChangesAsync();

            return post;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var post = await postRepository.GetByIdAsync(id);
            if (post == null)
            {
                return false; 
            }

            postRepository.Delete(post);
            await postRepository.SaveChangesAsync();

            return true;
        }

    }
}