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
    Policy = Constants.ScopePolicies.Workplace)]
public class WorkplaceController : ControllerBase
{
    private readonly TimeProvider _time;
    private readonly AppDbContext _context;
    private readonly CurrentUserService _currentUserService;

    public WorkplaceController(
        TimeProvider time,
        AppDbContext context,
        CurrentUserService currentUserService)
    {
        _time = time;
        _context = context;
        _currentUserService = currentUserService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var userId = _currentUserService.UserId;

        var workplaceItems = await _context.Workplace
            .AsNoTracking()
            .OrderBy(t => t.Id)
            .Where(t => t.UserId == userId)
            .ProjectToWorkplaceDetailModel()
            .ToListAsync();

        return Ok(workplaceItems);
    }

    [HttpPost]
    public async Task<IActionResult> Create(WorkplaceCreateModel model)
    {
        var userId = _currentUserService.UserId;

        var workplace = new Workplace
        {
            UserId = userId,
            Name = model.Name
        };

        await _context.AddAsync(workplace);
        await _context.SaveChangesAsync();

        var workplaceItem = workplace.MapToWorkplaceDetailModel();

        return Ok(workplaceItem);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, WorkplaceUpdateModel model)
    {
        var userId = _currentUserService.UserId;

        var workplace = await _context.Workplace
            .Where(t => t.UserId == userId && t.Id == id)
            .FirstOrDefaultAsync();

        if (workplace == null)
            return NotFound();

        workplace.Name = model.Name;

        await _context.SaveChangesAsync();

        var workplaceItem = workplace.MapToWorkplaceDetailModel();

        return Ok(workplaceItem);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userId = _currentUserService.UserId;

        var workplace = await _context.Workplace
            .Where(t => t.UserId == userId && t.Id == id)
            .FirstOrDefaultAsync();

        if (workplace == null)
            return NotFound();

        _context.Remove(workplace);
        await _context.SaveChangesAsync();

        return Ok();
    }
}