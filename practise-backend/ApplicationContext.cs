using Microsoft.EntityFrameworkCore;

public class ApplicationContext : DbContext
{
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Post> Posts { get; set; } = null!;
    // public ApplicationContext()
    // {
    //     //Database.EnsureDeleted();
    //     var databaseCreated = Database.EnsureCreated();
    //     if (databaseCreated)
    //     {
    //         User user1 = new User { Nickname = "andrew", FirstName = "Андрей", Photo = "andrew.png", Email = "andrew@surf.ru", Password = "*" };
    //         User user2 = new User { Nickname = "maria", FirstName = "Мария", Photo = "maria.jpg", Email = "maria@surf.ru", Password = "*" };
    //         User user3 = new User { Nickname = "nikita", FirstName = "Никита", Photo = "nikita.png", Email = "nikita@surf.ru", Password = "*" };

    //         Post post1 = new Post { Text = "Хорошо провели время", Author = user1, PublishDate = new DateTime(2023, 05, 05, 14, 25, 0), Photo = "1.jpg" };
    //         Post post2 = new Post { Text = "Покатались на досках", Author = user2, PublishDate = new DateTime(2023, 05, 23, 17, 11, 0), Photo = "2.jpg" };
    //         Post post3 = new Post { Text = "Еще раз поедем", Author = user3, PublishDate = new DateTime(2023, 05, 30, 20, 33, 0), Photo = "3.jpg" };


    //         Users.AddRange(user1, user2, user3);
    //         Posts.AddRange(post1, post2, post3);
    //         SaveChanges();
    //     }
    // }
    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) {}

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost;Port=5434;Database=surf_db;Username=myuser;Password=mypassword");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Настройка связи Один-ко-многим
        modelBuilder.Entity<Post>()
            .HasOne(p => p.User)
            .WithMany(u => u.Posts)
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}