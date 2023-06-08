using Microsoft.AspNetCore.Mvc;

using MySql.Data.MySqlClient;
using System.Diagnostics;
using System.Text.RegularExpressions;

namespace webapi.Controllers;



[ApiController]
[Route("api/[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    public string FirstName { get; set; }


    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;

}




    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {

        /*        string connectionString = "server=localhost;user=root;password=Numaistiuparole;database=test;"; ;*/

        string connectionString = "server=localhost;user=root;database=store_w_paths;port=3306;password=Numaistiuparole";

        MySqlConnection connection = new MySqlConnection(connectionString);

        connection.Open();

        string query = "SELECT * FROM products";
        MySqlCommand command = new MySqlCommand(query, connection);
        MySqlDataReader reader = command.ExecuteReader();

        while (reader.Read())
        {
            int id = reader.GetInt32("id");
            string name = reader.GetString("name");
            decimal price = reader.GetDecimal("price");

            // Do something with the data here

            Debug.WriteLine(id.ToString(), name, price.ToString());
            Debug.WriteLine(name, price.ToString());
        }

        connection.Close();

        
        Array en = Enumerable.Range(1,7).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();

        foreach( WeatherForecast forecast in en )
        {

            Debug.WriteLine(forecast.Summary);
        }

        Debug.WriteLine(en);


        /*Debug.WriteLi*/



        return (IEnumerable<WeatherForecast>)en;
/*        return lst;*/

    }
}
