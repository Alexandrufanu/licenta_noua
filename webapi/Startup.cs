using Microsoft.Extensions.DependencyInjection;

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors();
    }

    public void Configure(IApplicationBuilder app )
    {
        /*    app.UseCors(builder =>
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader());
        */

        app.UseCors(builder =>
             builder.WithOrigins("https://localhost:3006")
           .SetIsOriginAllowedToAllowWildcardSubdomains()
           .AllowAnyMethod()
           .AllowAnyHeader());
    }


}
