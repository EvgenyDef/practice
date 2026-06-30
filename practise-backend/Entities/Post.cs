using System.ComponentModel.DataAnnotations;

public class Post
{
    public int Id { get; set; }

    public string? Text { get; set; }

    [Required]
    public User? Author { get; set; }

    public string? Photo { get; set; }
    public DateTime? PublishDate { get; set; }


    public int UserId { get; set; }
    public User? User { get; set; }

    
}