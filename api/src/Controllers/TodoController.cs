using api.Helpers;
using api.Models;
using api.Persistence;
using api.Persistence.Entities;
using api.Persistence.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenIddict.Validation.AspNetCore;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme,
    Policy = Constants.Policies.Todo)]
public class TodoController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly CurrentUserService _currentUserService;
    private readonly TimeProvider _time;

    public TodoController(
        AppDbContext context,
        CurrentUserService currentUserService,
        TimeProvider time)
    {
        _context = context;
        _currentUserService = currentUserService;
        _time = time;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var userId = _currentUserService.UserId;
        var todoItems = await _context.Todo
            .AsNoTracking()
            .OrderBy(t => t.CreatedAt)
            .Where(t => t.UserId == userId)
            .ProjectToTodoDetailModel()
            .ToListAsync();

        return Ok(todoItems);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var userId = _currentUserService.UserId;
        var todoItem = await _context.Todo
            .AsNoTracking()
            .Where(t => t.UserId == userId && t.Id == id)
            .ProjectToTodoDetailModel()
            .FirstOrDefaultAsync();

        if (todoItem == null)
            return NotFound();

        return Ok(todoItem);
    }

    [HttpPost]
    public async Task<IActionResult> Create(TodoCreateModel model)
    {
        var userId = _currentUserService.UserId;

        var todo = new Todo
        {
            UserId = userId,
            Title = model.Title,
            Description = model.Description
        };

        await _context.Todo.AddAsync(todo);
        await _context.SaveChangesAsync();

        var todoItem = todo.MapToTodoDetailModel();

        return Ok(todoItem);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, TodoUpdateModel model)
    {
        var userId = _currentUserService.UserId;

        var todo = await _context.Todo
            .Where(t => t.UserId == userId && t.Id == id)
            .FirstOrDefaultAsync();

        if (todo == null)
            return NotFound();

        todo.Title = model.Title;
        todo.Description = model.Description;

        await _context.SaveChangesAsync();

        var todoItem = todo.MapToTodoDetailModel();

        return Ok(todoItem);
    }

    [HttpPut("{id}/Toggle")]
    public async Task<IActionResult> Toggle(int id)
    {
        var userId = _currentUserService.UserId;

        var todo = await _context.Todo
            .Where(t => t.UserId == userId && t.Id == id)
            .FirstOrDefaultAsync();

        if (todo == null)
            return NotFound();

        todo.IsCompleted = !todo.IsCompleted;

        if (todo.IsCompleted)
            todo.CompletedAt = _time.GetUtcNow().UtcDateTime;

        if (!todo.IsCompleted)
            todo.CompletedAt = null;

        await _context.SaveChangesAsync();

        var todoItem = todo.MapToTodoDetailModel();

        return Ok(todoItem);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userId = _currentUserService.UserId;

        var todo = await _context.Todo
            .Where(t => t.UserId == userId && t.Id == id)
            .FirstOrDefaultAsync();

        if (todo == null)
            return NotFound();

        _context.Todo.Remove(todo);

        await _context.SaveChangesAsync();

        return Ok();
    }
}