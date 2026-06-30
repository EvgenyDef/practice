using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class User
{
    public int Id { get; set; }
    
    [Required]
    [MinLength(3), MaxLength(20)]
    public string? Nickname { get; set; }

    [Required]
    public string? Password { get; set; }

    [Required]
    public string? Email { get; set; }

    [MaxLength(31)]
    public string? Lastname { get; set; }

    [MaxLength(31)]
    public string? FirstName { get; set; }
    public string? Photo { get; set; }
    public string? Contacts { get; set; }
    public string? About { get; set; }
    public string? Achievements { get; set; }

    [JsonIgnore]
    public List<Post> Posts { get; set; } = new();
}