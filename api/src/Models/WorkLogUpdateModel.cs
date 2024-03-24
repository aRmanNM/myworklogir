using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class WorkLogUpdateModel
{
    [Required(AllowEmptyStrings = false, ErrorMessage = "وارد کردن عنوان ضروری است")]
    public string Title { get; set; } = null!;
    public string? Description { get; set; }

    public int? WorkplaceId { get; set; }
}