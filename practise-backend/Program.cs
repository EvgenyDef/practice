// var builder = WebApplication.CreateBuilder(args);

// // Add services to the container.
// // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// var app = builder.Build();

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();

// var summaries = new[]
// {
//     "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
// };

// app.MapGet("/weatherforecast", () =>
// {
//     var forecast =  Enumerable.Range(1, 5).Select(index =>
//         new WeatherForecast
//         (
//             DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
//             Random.Shared.Next(-20, 55),
//             summaries[Random.Shared.Next(summaries.Length)]
//         ))
//         .ToArray();
//     return forecast;
// })
// .WithName("GetWeatherForecast")
// .WithOpenApi();

// app.Run();

// record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
// {
//     public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
// }


using Microsoft.EntityFrameworkCore;
using practise_backend.Repository;
using practise_backend.Services;

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// using (ApplicationContext db = new ApplicationContext())
// {
//     // получаем объекты из бд и выводим на консоль
//     var users = db.Users.ToList();
//     Console.WriteLine("Users list:");
//     foreach (User u in users)
//     {
//         Console.WriteLine($"{u.Id}.{u.Nickname} - {u.Email}");
//     }
// }



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularOrigins",
    builder =>
    {
        builder.WithOrigins(
                            "http://localhost:4200"
                            )
                            .AllowAnyHeader()
                            .AllowAnyMethod();
    });
});

// Регистрируем бин базы данных
builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Регистрируем репозитории
builder.Services.AddScoped<IUserRepository, UserRepostory>();
builder.Services.AddScoped<IPostRepository, PostRepository>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPostService, PostService>();

var app = builder.Build();

app.UseCors("AllowAngularOrigins");

app.UseStaticFiles();

//app.UseMiddleware<BasicAuthMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();

