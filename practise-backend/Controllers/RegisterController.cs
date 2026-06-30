using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using practise_backend.Services;

[ApiController]
[Route("api/[controller]")]
public class RegisterController : ControllerBase
{
    private readonly IUserService userService;

    public RegisterController(IUserService userService)
    {
        this.userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDto model)
    {
        var response = await userService.RegisterAsync(model);
        return Ok(response);
        // using (var db = new ApplicationContext())
        // {
            
        // }
        // return Ok(new
        // {
        //     id = 1,
        //     nickname = "141"
        // });  
    }
}