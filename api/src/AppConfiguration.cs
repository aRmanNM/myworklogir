using api.Helpers;
using api.Persistence;
using api.Persistence.Entities;
using api.Persistence.Interceptors;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using static api.Constants;

namespace api;

public static class AppConfiguration
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();

        services.Configure<ForwardedHeadersOptions>(options =>
        {
            options.ForwardedHeaders = ForwardedHeaders.All;
        });

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddCors();

        services.AddScoped<CurrentUserService>();

        services.AddHttpContextAccessor();

        services.AddSingleton<TimeProvider>(TimeProvider.System);

        services.AddScoped<AppSaveChangesInterceptor>();

        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
            options.UseOpenIddict<int>();
        });

        services.AddIdentity<User, Role>(options =>
        {
            options.Password.RequireDigit = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
        })
        .AddEntityFrameworkStores<AppDbContext>()
        .AddDefaultTokenProviders();

        services.AddOpenIddict()
            .AddCore(options =>
            {
                options.UseEntityFrameworkCore()
                       .UseDbContext<AppDbContext>()
                       .ReplaceDefaultEntities<int>();
            })
            .AddServer(options =>
            {
                options.SetTokenEndpointUris("connect/token");
                options.SetIntrospectionEndpointUris("connect/introspect");
                options.SetUserinfoEndpointUris("userinfo");

                options.SetAccessTokenLifetime(TimeSpan.FromHours(24));

                options.AllowPasswordFlow();

                options.DisableScopeValidation();

                options.AddDevelopmentEncryptionCertificate()
                    .AddDevelopmentSigningCertificate();

                options.UseAspNetCore()
                    .EnableTokenEndpointPassthrough();
            })
            .AddValidation(options =>
            {
                options.UseLocalServer();
                options.UseAspNetCore();
            });

        services.AddAuthorization(options =>
        {
            // check here: https://github.com/openiddict/openiddict-core/issues/1328
            options.AddPolicy(ScopePolicies.Todo, builder => ContainScope(builder, Scopes.Todo));
            options.AddPolicy(ScopePolicies.WorkLog, builder => ContainScope(builder, Scopes.WorkLog));
            options.AddPolicy(ScopePolicies.Workplace, builder => ContainScope(builder, Scopes.Workplace));
        });

        services.AddHostedService<InitializerService>();

        services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy
                    .WithOrigins(configuration["AllowedOrigin"]!)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });

        return services;
    }

    private static AuthorizationPolicyBuilder ContainScope(AuthorizationPolicyBuilder builder, string scopeName)
    {
        return builder.RequireAssertion(context =>
        {
            var claim = context.User.FindFirst("scope");
            if (claim == null)
            {
                return false;
            }

            return claim.Value.Split(' ')
                .Any(s => string.Equals(s,
                    scopeName,
                    StringComparison.InvariantCultureIgnoreCase));
        });
    }
}