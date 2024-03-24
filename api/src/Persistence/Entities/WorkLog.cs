using System.ComponentModel.DataAnnotations.Schema;

namespace api.Persistence.Entities;

public class WorkLog : BaseEntity
{
    public int UserId { get; set; }

    public int? WorkplaceId { get; set; }
    public Workplace? Workplace { get; set; }

    public string? Title { get; set; }
    public string? Description { get; set; }

    public DateTime StartedAt { get; set; }
    public DateTime? FinishedAt { get; set; }

    public WorkLogStatus Status { get; set; }

    [NotMapped]
    public TimeSpan Duration
        => FinishedAt == null ? TimeSpan.Zero : (TimeSpan)(FinishedAt - StartedAt);
}

public enum WorkLogStatus
{
    Started,
    Finished
}