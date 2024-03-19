namespace api.Persistence.Entities;

public class WorkLog : BaseEntity
{
    public int UserId { get; set; }

    public string? Title { get; set; }
    public string? Description { get; set; }

    public DateTime StartedAt { get; set; }
    public DateTime FinishedAt { get; set; }
}