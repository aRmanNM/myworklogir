using api.Models;
using api.Persistence.Entities;

namespace api.Helpers;

public static class Mapper
{
    public static TodoDetailModel MapToTodoDetailModel(this Todo t)
        => new TodoDetailModel
        {
            Id = t.Id,
            Title = t.Title,
            Description = t.Description,
            IsCompleted = t.IsCompleted,
            CompletedAt = t.CompletedAt,
            CreatedAt = t.CreatedAt,
            LastEditedAt = t.LastEditedAt
        };

    public static WorkLogDetailModel MapToWorkLogDetailModel(this WorkLog w)
        => new WorkLogDetailModel
        {
            Id = w.Id,
            Title = w.Title,
            Description = w.Description,
            StartedAt = w.StartedAt,
            FinishedAt = w.FinishedAt,
            CreatedAt = w.CreatedAt,
            LastEditedAt = w.LastEditedAt,
            Duration = w.Duration
        };
}