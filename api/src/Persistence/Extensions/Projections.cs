using api.Models;
using api.Persistence.Entities;

namespace api.Persistence.Extensions;

public static class Projections
{
    public static IQueryable<TodoDetailModel> ProjectToTodoDetailModel(this IQueryable<Todo> todo)
        => todo.Select(t => new TodoDetailModel
        {
            Id = t.Id,
            Title = t.Title,
            Description = t.Description,
            IsCompleted = t.IsCompleted,
            CompletedAt = t.CompletedAt,
            CreatedAt = t.CreatedAt,
            LastEditedAt = t.LastEditedAt,
            WorkplaceId = t.Workplace!.Id,
            WorkplaceName = t.Workplace!.Name // it will convert to query so it's safe
        });

    public static IQueryable<WorkLogDetailModel> ProjectToWorkLogDetailModel(this IQueryable<WorkLog> worklog)
        => worklog.Select(w => new WorkLogDetailModel
        {
            Id = w.Id,
            Title = w.Title,
            Description = w.Description,
            StartedAt = w.StartedAt,
            FinishedAt = w.FinishedAt,
            CreatedAt = w.CreatedAt,
            LastEditedAt = w.LastEditedAt,
            Duration = w.Duration,
            Status = w.Status,
            WorkplaceId = w.Workplace!.Id,
            WorkplaceName = w.Workplace!.Name  // it will convert to query so it's safe
        });

    public static IQueryable<WorkplaceDetailModel> ProjectToWorkplaceDetailModel(this IQueryable<Workplace> workplace)
        => workplace.Select(w => new WorkplaceDetailModel
        {
            Id = w.Id,
            Name = w.Name
        });
}