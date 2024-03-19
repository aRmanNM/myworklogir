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
}