using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class TodoUpdateModel
{
    [Required(AllowEmptyStrings = false, ErrorMessage = "وارد کردن عنوان ضروری است")]
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
}