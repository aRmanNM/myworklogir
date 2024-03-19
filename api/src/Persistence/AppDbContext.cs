using api.Persistence.Entities;
using api.Persistence.Interceptors;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Persistence;

public class AppDbContext : IdentityDbContext<User, Role, int>
{
    private readonly AppSaveChangesInterceptor _appSaveChangesInterceptor;

    public AppDbContext(
        DbContextOptions options,
        AppSaveChangesInterceptor appSaveChangesInterceptor) : base(options)
    {
        _appSaveChangesInterceptor = appSaveChangesInterceptor;
    }

    public DbSet<Todo> Todo { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.AddInterceptors(_appSaveChangesInterceptor);
        base.OnConfiguring(optionsBuilder);
    }
}