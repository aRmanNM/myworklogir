namespace api.Persistence.Entities;

public class Todo : BaseEntity
{
    public int UserId { get; set; }

    public int? WorkplaceId { get; set; }
    public Workplace? Workplace { get; set; }

    public string? Title { get; set; }
    public string? Description { get; set; }

    public bool IsCompleted { get; set; }
    public DateTime? CompletedAt { get; set; }
}