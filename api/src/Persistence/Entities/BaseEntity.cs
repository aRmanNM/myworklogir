namespace api.Persistence.Entities;

public class BaseEntity
{
    public int Id { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? LastEditedAt { get; set; }

    public bool IsDeleted { get; set; }
}