using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class RegisterModel
{
    [Required(ErrorMessage = "وارد کردن ایمیل ضروری است")]
    [EmailAddress(ErrorMessage = "ایمیل معتبر نیست")]
    public string Email { get; set; } = null!;

    [Required(ErrorMessage = "وارد کردن رمز عبور ضروری است")]
    [MinLength(6, ErrorMessage = "رمز عبور حداقل ۶ کاراکتر باید باشد")]
    public string Password { get; set; } = null!;
}