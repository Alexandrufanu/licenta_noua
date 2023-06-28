


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddMemoryCache();

builder.Services.AddResponseCaching(); // Add response caching services
builder.Services.AddCors(); // Add CORS services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting(); // Use routing

app.UseCors(builder => // Use CORS and configure it
    builder.WithOrigins("https://localhost:3006")
    .SetIsOriginAllowedToAllowWildcardSubdomains()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseResponseCaching(); // Use response caching

app.UseAuthorization();

app.MapControllers();

app.Run();













/*var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
*/