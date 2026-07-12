using System.Net;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using practise_backend.Services;

[ApiController]
//[Route("[controller]")]
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
        try
        {
            var response = await userService.RegisterAsync(model);
            return Ok(response);
        }
        catch (Exception e)
        {
            return  BadRequest(new { message = e.Message });
            //return StatusCode(HttpStatusCode.BadRequest, new {message = e.Message});
        }

    }
}