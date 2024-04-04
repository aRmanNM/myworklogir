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
    Policy = Constants.ScopePolicies.WorkLog)]
public class WorkLogController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly TimeProvider _time;
    private readonly CurrentUserService _currentUserService;

    public WorkLogController(AppDbContext context, TimeProvider time, CurrentUserService currentUserService)
    {
        _context = context;
        _time = time;
        _currentUserService = currentUserService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var userId = _currentUserService.UserId;
        var workLogItems = await _context.WorkLog
            .AsNoTracking()
            .OrderBy(t => t.CreatedAt)
            .Where(t => t.UserId == userId)
            .ProjectToWorkLogDetailModel()
            .ToListAsync();

        return Ok(workLogItems);
    }

    [HttpPost]
    public async Task<IActionResult> Create(WorkLogCreateModel model)
    {
        var userId = _currentUserService.UserId;

        var workLog = new WorkLog
        {
            UserId = userId,
            Title = model.Title,
            Description = model.Description,
            StartedAt = model.StartedAt,
            FinishedAt = model.FinishedAt,
            Status = WorkLogStatus.Finished,
            WorkplaceId = model.WorkplaceId
        };

        await _context.WorkLog.AddAsync(workLog);
        await _context.SaveChangesAsync();

        var workLogItem = workLog.MapToWorkLogDetailModel();

        return Ok(workLogItem);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, WorkLogUpdateModel model)
    {
        var userId = _currentUserService.UserId;

        var workLog = await _context.WorkLog
            .Include(t => t.Workplace)
            .Where(t => t.UserId == userId && t.Id == id)
            .FirstOrDefaultAsync();

        if (workLog == null)
            return NotFound();

        workLog.Title = model.Title;
        workLog.Description = model.Description;
        workLog.WorkplaceId = model.WorkplaceId;

        await _context.SaveChangesAsync();

        var workLogItem = workLog.MapToWorkLogDetailModel();

        return Ok(workLogItem);
    }

    [HttpPut("{id}/Finish")]
    public async Task<IActionResult> Finish(int id)
    {
        var userId = _currentUserService.UserId;

        var workLog = await _context.WorkLog
            .Include(t => t.Workplace)
            .Where(t => t.UserId == userId && t.Id == id)
            .FirstOrDefaultAsync();

        if (workLog == null)
            return NotFound();

        workLog.Status = WorkLogStatus.Finished;
        workLog.FinishedAt = _time.GetUtcNow().UtcDateTime;

        await _context.SaveChangesAsync();

        var workLogItem = workLog.MapToWorkLogDetailModel();

        return Ok(workLogItem);
    }

    [HttpPost("Start")]
    public async Task<IActionResult> Start(WorkLogStartModel model)
    {
        var userId = _currentUserService.UserId;

        var hasUnfinishedWorkLog = await _context.WorkLog
            .AnyAsync(w => w.UserId == userId && w.Status == WorkLogStatus.Started);

        if (hasUnfinishedWorkLog)
            throw new InvalidOperationException("قبل از اتمام ورکگلاگ قبلی امکان تعریف ورکلاگ جدید وجود ندارد");

        var workLog = new WorkLog
        {
            UserId = userId,
            Title = model.Title,
            StartedAt = _time.GetUtcNow().UtcDateTime,
            Status = WorkLogStatus.Started
        };

        await _context.WorkLog.AddAsync(workLog);
        await _context.SaveChangesAsync();

        var workLogItem = workLog.MapToWorkLogDetailModel();

        return Ok(workLogItem);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userId = _currentUserService.UserId;

        var workLog = await _context.WorkLog
            .Where(t => t.UserId == userId && t.Id == id)
            .FirstOrDefaultAsync();

        if (workLog == null)
            return NotFound();

        _context.Remove(workLog);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("all")]
    public async Task<IActionResult> DeleteAll()
    {
        var userId = _currentUserService.UserId;

        var workLogs = await _context.WorkLog
            .Where(t => t.UserId == userId)
            .ToListAsync();

        _context.WorkLog.RemoveRange(workLogs);

        await _context.SaveChangesAsync();

        return Ok();
    }
}