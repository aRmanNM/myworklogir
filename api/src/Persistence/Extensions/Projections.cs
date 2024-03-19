using api.Models;
using api.Persistence.Entities;

namespace api.Persistence.Extensions;

public static class Projections
{
    public static IQueryable<TodoDetailModel> ProjectToTodoDetailModel(this IQueryable<Todo> todo)
    {
        return todo
            .Select(t => new TodoDetailModel
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                IsCompleted = t.IsCompleted,
                CompletedAt = t.CompletedAt,
                CreatedAt = t.CreatedAt,
                LastEditedAt = t.LastEditedAt
            });
    }
}