using System.Text.Json;
using api.Models;
using api.Persistence.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly ILogger<AccountController> _logger;

    public AccountController(
        UserManager<User> userManager,
        ILogger<AccountController> logger)
    {
        _userManager = userManager;
        _logger = logger;
    }

    [HttpPost("~/Account/Register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = await _userManager.FindByNameAsync(request.Email);

        if (user != null)
        {
            return Conflict();
        }

        user = new User() { UserName = request.Email, Email = request.Email };
        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            _logger.LogError("خطای ساخت حساب کاربری: {0}", JsonSerializer.Serialize(result.Errors.Select(e => e.Code)));
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        return Ok();
    }
}