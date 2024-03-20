using api.Helpers;
using api.Persistence;
using api.Persistence.Entities;
using api.Persistence.Interceptors;
using api.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api;

public static class AppConfiguration
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();

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
            options.AddPolicy(Constants.Policies.Todo, builder =>
                builder.RequireAssertion(context =>
                {
                    var claim = context.User.FindFirst("scope");
                    if (claim == null)
                    {
                        return false;
                    }

                    return claim.Value.Split(' ')
                        .Any(s => string.Equals(s,
                            Constants.Scopes.Todo,
                            StringComparison.InvariantCultureIgnoreCase));
                })
            );
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
}