using Microsoft.AspNetCore.Mvc;


using MySql.Data.MySqlClient;
using System.Diagnostics;
using System.Text.RegularExpressions;



using Microsoft.AspNetCore.Hosting;
using System.Collections.Generic;
using System.IO;


using Microsoft.AspNetCore.SpaServices.Prerendering;

using System.Collections.Generic;

using DotNetEnv;

using Docker.DotNet;
using Docker.DotNet.Models;
using Microsoft.Extensions.Caching.Memory;





namespace webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {

        /*private readonly ISpaPrerenderer _prerenderer;

        public ClothesController(ISpaPrerenderer prerenderer)
        {
            _prerenderer = prerenderer;
        }*/

        /*[HttpGet]
        public async Task<string> GetPrerendered()
        {
            // Supply any required data to the prerendering module here
            var supplyData = new Dictionary<string, object>();

            // Prerender the initial HTML content
            var result = await _prerenderer.RenderToString(
                "/dist/server/main.js", // the path to your prerendering module
                supplyData,
                timeoutMilliseconds: 10000, // the maximum time to wait for prerendering to complete
                requestPath: "/"); // the request path to render

            return result.Html;
        }*/




        private readonly IWebHostEnvironment _env;
        private readonly IMemoryCache _memoryCache;


        public ItemController(IWebHostEnvironment env, IMemoryCache memoryCache)
        {
            _env = env;
            _memoryCache = memoryCache;
        }

        /*    [HttpGet("get_container_id")]
            public static async Task<string> GetContainerId()
            {
                // Create a new DockerClient
                var config = new DockerClientConfiguration(new Uri("unix:///var/run/docker.sock"));
                var client = config.CreateClient();

                // Get the container information
                var containers = await client.Containers.ListContainersAsync(new ContainersListParameters { Limit = 1 });
                var containerId = containers.FirstOrDefault()?.ID;

                return containerId;
            }*/
        [HttpGet("get_container_id")]
        public async Task<string> GetContainerId()
        {
            return "LearningPlatformBE";
        }





        [HttpGet]
/*        [ResponseCache(Duration = 30, VaryByQueryKeys = new[] { "numberOfResults", "testNumber" })]*/
        public IEnumerable<Item> GetItem(int numberOfResults, int testNumber = -1)
        {

            string connectionString = Environment.GetEnvironmentVariable("connectionString");


            MySqlConnection connection = new MySqlConnection(connectionString);

            connection.Open();

            string query = "SELECT * FROM items" +
                " LIMIT " + numberOfResults;
            MySqlCommand command = new MySqlCommand(query, connection);
            MySqlDataReader reader = command.ExecuteReader();
            var clothes = new List<Item>();



            while (reader.Read())
            {
                int id = reader.GetInt32("id");
                string name = reader.GetString("name");
                string description = reader.GetString("description");
                string content = reader.GetString("content");

                string path = reader.GetString("img_path");

                /*float price = 22;*/


                // Do something with the data here
                clothes.Add(new Item(id, name, description, content, GetImageBytes(path)));


                /*Debug.WriteLine(id.ToString(), name, path);
                Debug.WriteLine(name, path);*/

                Debug.WriteLine(testNumber.ToString(), testNumber.ToString(), testNumber.ToString(), testNumber.ToString());
            }

            connection.Close();





            Debug.WriteLine("Called this endpoint");

            /*clothes = new List<Clothes>
            {

                new Clothes (2, "Jeans", 49.99m, GetImageBytes("tshirt.png")),
                new Clothes (3, "Sneakers", 79.99m, GetImageBytes("sneaker.jpg")),
                new Clothes (1, "T-Shirt", 19.99m, GetImageBytes("tshirt.png") )
            };

            clothes.Add(new Clothes(1, "T-Shirt", 19.99m, GetImageBytes("tshirt.png")));
*/


            Debug.WriteLine(clothes);
            Debug.WriteLine(clothes[0].Name);
            return clothes;
            /*            return Ok(new Clothes(1, "T-Shirt", 19.99m, GetImageBytes("tshirt.png")));*/
        }















        [HttpGet("logo")]
        public Byte[] ClothesLogo(int numberOfResults, int testNumber = -1)
        {


            return GetImageBytes("images/MerticMaster-MainLogo.PNG");
            /*            return Ok(new Clothes(1, "T-Shirt", 19.99m, GetImageBytes("tshirt.png")));*/
        }






        /// <summary>
        /// Changes here !!!!!!!!
        /// </summary>
        /// <returns></returns>
        /*[HttpGet]
        public IEnumerable<Clothes> GetClothes()
          {
            Debug.WriteLine("Called this endpoint");

            var clothes = new List<Clothes>
            {
*//*                new Clothes (1, "T-Shirt", 19.99m, GetImageBytes("shopping-cart.png") ),*//*
                new Clothes (2, "Jeans", 49.99m, GetImageBytes("tshirt.png")),
                new Clothes (3, "Sneakers", 79.99m, GetImageBytes("sneaker.jpg")),
                new Clothes (1, "T-Shirt", 19.99m, GetImageBytes("tshirt.png") )
            };

            clothes.Add(new Clothes(1, "T-Shirt", 19.99m, GetImageBytes("tshirt.png")));



            Debug.WriteLine(clothes);
            Debug.WriteLine(clothes[0].Name);
            return clothes;
*//*            return Ok(new Clothes(1, "T-Shirt", 19.99m, GetImageBytes("tshirt.png")));*//*
        }*/



        [HttpGet("cached")]
        [ResponseCache(Duration = 180, VaryByQueryKeys = new[] { "numberOfResults", "testNumber" })]
        public IEnumerable<Clothes> GetClothesCache180(int numberOfResults, int testNumber = -1)
        {


            string cacheKey = $"Clothes:cached:numberOfResults={numberOfResults}:testNumber={testNumber}";

            // Checking if cache entry already exists
            if (_memoryCache.TryGetValue(cacheKey, out List<Clothes> cachedClothes))
            {
                return cachedClothes;
            }

            string connectionString = Environment.GetEnvironmentVariable("connectionString");

            MySqlConnection connection = new MySqlConnection(connectionString);

            connection.Open();

            string query = "SELECT * FROM products" +
                " LIMIT " + numberOfResults;
            MySqlCommand command = new MySqlCommand(query, connection);
            MySqlDataReader reader = command.ExecuteReader();
            var clothes = new List<Clothes>();



            while (reader.Read())
            {
                int id = reader.GetInt32("id");
                string name = reader.GetString("name");
                string path = reader.GetString("img_path");
                float price = reader.GetFloat("price");

                // Do something with the data here
                clothes.Add(new Clothes(id, name, (decimal)(price), GetImageBytes(path)));


                /*Debug.WriteLine(id.ToString(), name, path);
                Debug.WriteLine(name, path);*/

                Debug.WriteLine(testNumber.ToString(), testNumber.ToString(), testNumber.ToString(), testNumber.ToString());
            }

            connection.Close();





            Debug.WriteLine("Called this endpoint");

            /*clothes = new List<Clothes>
            {

                new Clothes (2, "Jeans", 49.99m, GetImageBytes("tshirt.png")),
                new Clothes (3, "Sneakers", 79.99m, GetImageBytes("sneaker.jpg")),
                new Clothes (1, "T-Shirt", 19.99m, GetImageBytes("tshirt.png") )
            };

            clothes.Add(new Clothes(1, "T-Shirt", 19.99m, GetImageBytes("tshirt.png")));
*/
            // Saving the cache entry
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(3));

            _memoryCache.Set(cacheKey, clothes, cacheEntryOptions);


            Debug.WriteLine(clothes);
            Debug.WriteLine(clothes[0].Name);
            return clothes;
            /*            return Ok(new Clothes(1, "T-Shirt", 19.99m, GetImageBytes("tshirt.png")));*/
        }




        private static byte[] GetImageBytes(string imageName)
        {

            string imagePath = Path.Combine(Environment.CurrentDirectory, imageName);



            /*Debug.WriteLine(imagePath);*/
            return System.IO.File.ReadAllBytes(imagePath);
        }


        // creating a methid for returning all items from the database
        /*[HttpGet("all")]
        public static IEnumerable<*/




        [HttpDelete]
        public IActionResult DeleteCache(int numberOfResults, int testNumber)
        {
            string cacheKey = $"Clothes:cached:numberOfResults={numberOfResults}:testNumber={testNumber}";

            if (_memoryCache.TryGetValue(cacheKey, out _))
            {
                _memoryCache.Remove(cacheKey);
                return Ok();
            }
            else
            {
                // Cache entry not found, handle the situation accordingly
                return NotFound();
            }
        }



    }






}

