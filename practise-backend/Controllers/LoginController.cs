using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

[ApiController]
//[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    private readonly IUserService userService;

    public LoginController(IUserService userService)
    {
        this.userService = userService;
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto model)
    {
        User? user = await userService.AuthenticateAsync(model.Nickname, model.Password);
        if (user == null || !Equals(user.Password, model.Password))
            return Unauthorized(new { message = "Неправильный логин или пароль"});
        else
            return Ok(new
            {
                userId = user.Id,
                nickname = user.Nickname
            });
        // if (string.IsNullOrEmpty(model.Nickname) || string.IsNullOrEmpty(model.Password))
        // {
        //     return BadRequest("Имя пользователя и пароль не могут быть пустыми");
        // }

        // using (var db = new ApplicationContext())
        // {
        //     var user = db.Users.FirstOrDefault(c => c.Nickname == model.Nickname);
        //     if (user == null)
        //     {
        //         return BadRequest("Пользователся с таким логином нет");
        //     }

        //         return Ok(new
        //         {
        //             userId = 1,
        //             nickname = model.Nickname
        //         });
        // }
    }
}