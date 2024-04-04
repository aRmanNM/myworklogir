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
    public DbSet<WorkLog> WorkLog { get; set; }
    public DbSet<Workplace> Workplace { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.AddInterceptors(_appSaveChangesInterceptor);
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Todo>(b =>
        {
            b.HasQueryFilter(p => !p.IsDeleted);
        });

        builder.Entity<WorkLog>(b =>
        {
            b.HasQueryFilter(p => !p.IsDeleted);
        });

        base.OnModelCreating(builder);
    }
}