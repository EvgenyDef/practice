public class CreatePostDto
{
    public string Text { get; set; } = string.Empty;
    public string? ImagePath { get; set; }
    public int AuthorId { get; set; } 
}