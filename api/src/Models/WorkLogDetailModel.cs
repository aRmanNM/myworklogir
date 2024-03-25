using api.Persistence.Entities;

namespace api.Models;

public class WorkLogDetailModel
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime? FinishedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastEditedAt { get; set; }
    public TimeSpan Duration { get; set; }
    public WorkLogStatus Status { get; set; }

    public int? WorkplaceId { get; set; }
    public string? WorkplaceName { get; set; }
}