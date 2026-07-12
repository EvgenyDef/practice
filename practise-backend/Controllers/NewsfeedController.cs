using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using practise_backend.Services;

[ApiController]
//[Route("login/[controller]")]
public class NewsfeedController : ControllerBase
{
    private readonly IPostService postService;

    public NewsfeedController(IPostService postService)
    {
        this.postService = postService;
    }

    [HttpGet("feed")]
    public async Task<IActionResult> GetPostsAsync()
    {
        try {
            List<Post> posts = await postService.GetFeedAsync();
            return Ok(posts);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "Ошибка при загрузке ленты новостей",
                error = ex.Message
            });
        }

    }

    [HttpPost("create")]
        public async Task<IActionResult> CreatePost([FromBody] CreatePostDto model)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(model.Text))
                {
                    return BadRequest(new { message = "Текст публикации не может быть пустым" });
                }

                // Преобразуем DTO в полноценную сущность Post
                var post = new Post
                {
                    Text = model.Text,
                    Photo = model.ImagePath,
                    AuthorId = model.AuthorId 
                };

                var createdPost = await postService.CreateAsync(post);

                return StatusCode(201, createdPost);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ошибка при создании публикации", error = ex.Message });
            }
        }
}