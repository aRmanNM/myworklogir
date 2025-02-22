namespace api.Models;

public class TodoDetailModel
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime? CompletedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastEditedAt { get; set; }

    public int? WorkplaceId { get; set; }
    public string? WorkplaceName { get; set; }
}