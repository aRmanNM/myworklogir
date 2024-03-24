
using System.Reflection.Metadata;
using api.Persistence;
using OpenIddict.Abstractions;

namespace api.Services;

public class InitializerService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly IConfiguration _configuration;

    public InitializerService(
        IServiceProvider serviceProvider,
        IConfiguration configuration)
    {
        _serviceProvider = serviceProvider;
        _configuration = configuration;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var scope = _serviceProvider.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        await context.Database.EnsureCreatedAsync();

        await InitializeScopes(scope, stoppingToken);
        await InitializeApps(scope, stoppingToken);
    }

    private async Task InitializeScopes(IServiceScope scope, CancellationToken cancellationToken)
    {
        var scopeManager = scope.ServiceProvider.GetRequiredService<IOpenIddictScopeManager>();

        var scopeDescriptors = new List<OpenIddictScopeDescriptor>()
        {
            new OpenIddictScopeDescriptor { Name = Constants.Scopes.Todo, Resources = { "todo-api" } },
            new OpenIddictScopeDescriptor { Name = Constants.Scopes.WorkLog, Resources = { "worklog-api" } },
            new OpenIddictScopeDescriptor { Name = Constants.Scopes.Workplace, Resources = { "workplace-api" } }
        };

        foreach (var scopeDescriptor in scopeDescriptors)
        {
            var scopeInstance = await scopeManager.FindByNameAsync(scopeDescriptor.Name!, cancellationToken);

            if (scopeInstance == null)
                await scopeManager.CreateAsync(scopeDescriptor, cancellationToken);
            else
                await scopeManager.UpdateAsync(scopeInstance, scopeDescriptor, cancellationToken);
        }
    }

    private async Task InitializeApps(IServiceScope scope, CancellationToken cancellationToken)
    {
        var appManager = scope.ServiceProvider.GetRequiredService<IOpenIddictApplicationManager>();

        var appDescriptor = new OpenIddictApplicationDescriptor
        {
            ClientId = _configuration["DefaultClientId"],
            ClientSecret = _configuration["DefaultClientSecret"],
            ClientType = OpenIddictConstants.ClientTypes.Confidential,
            Permissions =
            {
                OpenIddictConstants.Permissions.Endpoints.Token,
                OpenIddictConstants.Permissions.Endpoints.Introspection,

                OpenIddictConstants.Permissions.GrantTypes.Password,

                OpenIddictConstants.Permissions.Scopes.Email,
                OpenIddictConstants.Permissions.Scopes.Profile,
                OpenIddictConstants.Permissions.Scopes.Roles,

                // app-specific scopes
                OpenIddictConstants.Permissions.Prefixes.Scope + Constants.Scopes.Todo,
                OpenIddictConstants.Permissions.Prefixes.Scope + Constants.Scopes.WorkLog,
                OpenIddictConstants.Permissions.Prefixes.Scope + Constants.Scopes.Workplace,
            }
        };

        var client = await appManager.FindByClientIdAsync(appDescriptor.ClientId!, cancellationToken);

        if (client == null)
        {
            await appManager.CreateAsync(appDescriptor, cancellationToken);
        }
        else
        {
            await appManager.UpdateAsync(client, appDescriptor, cancellationToken);
        }
    }


}