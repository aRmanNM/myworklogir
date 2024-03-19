using static OpenIddict.Abstractions.OpenIddictConstants;

namespace api.Helpers;

public class CurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public int UserId =>
        int.TryParse(
            _httpContextAccessor.HttpContext!.User
                .FindFirst(Claims.Subject)?.Value, out int userId)
        ? userId
        : throw new Exception("کاربر نامعتبر است");
}