using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class WorkplaceUpdateModel
{
    [Required(AllowEmptyStrings = false, ErrorMessage = "وارد کردن نام ضروری است")]
    public string Name { get; set; } = null!;
}