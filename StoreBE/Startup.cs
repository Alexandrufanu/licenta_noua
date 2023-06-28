/*using Microsoft.Extensions.DependencyInjection;
using System.Diagnostics;

*//*public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors();

        Debug.WriteLine("SERVICES, here, all data should be already added to the app...");

    }

    public void Configure(IApplicationBuilder app )
    {
        *//*    app.UseCors(builder =>
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader());
        *//*

        app.UseCors(builder =>
             builder.WithOrigins("https://localhost:3006")
           .SetIsOriginAllowedToAllowWildcardSubdomains()
           .AllowAnyMethod()
           .AllowAnyHeader());

        app.UseResponseCaching();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
        });

        Debug.WriteLine("TEST, here, all data should be already added to the app...");


    }

    *//*Debug.WriteLine("TEST, here, all data should be already added to the app...");*//*


}
*/





/*public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers(); // This is needed to add services required for controllers
        services.AddResponseCaching(); // Add response caching services
        services.AddCors();

        Debug.WriteLine("SERVICES, here, all data should be already added to the app...");
    }

    public void Configure(IApplicationBuilder app)
    {
        app.UseRouting(); // This needs to be called before using CORS

        app.UseCors(builder =>
             builder.WithOrigins("https://localhost:3006")
           .SetIsOriginAllowedToAllowWildcardSubdomains()
           .AllowAnyMethod()
           .AllowAnyHeader());

        app.UseResponseCaching();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
        });

        Debug.WriteLine("TEST, here, all data should be already added to the app...");
    }
}
*//*




using Microsoft.Extensions.Caching.Memory;

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        //services.AddSingleton<IMemoryCache, MemoryCache>();  // explicit registration
        services.AddMemoryCache(); // Add memory cache service

        services.AddControllers();
        services.AddResponseCaching();
        services.AddCors();
        Debug.WriteLine("SERVICES, here, all data should be already added to the app...");
    }


    public void Configure(IApplicationBuilder app)
    {
        app.UseRouting(); // This needs to be called before using CORS

*//*        app.
*//*
        app.UseCors(builder =>
            builder.WithOrigins("https://localhost:3006")
            .SetIsOriginAllowedToAllowWildcardSubdomains()
            .AllowAnyMethod()
            .AllowAnyHeader());

        app.UseResponseCaching();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
        });

        Debug.WriteLine("TEST, here, all data should be already added to the app...");
    }
}











*/