using api.Persistence.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace api.Persistence.Interceptors;

public class AppSaveChangesInterceptor : SaveChangesInterceptor
{
    private readonly TimeProvider _time;

    public AppSaveChangesInterceptor(TimeProvider time)
    {
        _time = time;
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
        DbContextEventData eventData, InterceptionResult<int> result,
        CancellationToken cancellationToken = default)
    {
        ApplyEntityChanges(eventData.Context);

        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    private void ApplyEntityChanges(DbContext? context)
    {
        if (context == null)
            return;

        foreach (var entry in context.ChangeTracker.Entries<BaseEntity>())
        {
            var now = _time.GetUtcNow().UtcDateTime;

            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = now;
            }
            else if (entry.State == EntityState.Modified)
            {
                entry.Entity.LastEditedAt = now;
            }
        }
    }
}