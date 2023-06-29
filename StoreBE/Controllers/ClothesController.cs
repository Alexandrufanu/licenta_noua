    using Microsoft.AspNetCore.Mvc;


    using MySql.Data.MySqlClient;
    using System.Diagnostics;
    using System.Text.RegularExpressions;



    using Microsoft.AspNetCore.Hosting;
    using System.Collections.Generic;
    using System.IO;


    using Microsoft.AspNetCore.SpaServices.Prerendering;

    using System.Collections.Generic;
    using Microsoft.Extensions.Caching.Memory;

    using DotNetEnv;




namespace webapi.Controllers
    {
        [ApiController]
        [Route("api/[controller]")]
        public class ClothesController : ControllerBase
        {



        private readonly IWebHostEnvironment _env;
        private readonly IMemoryCache _memoryCache;

        public ClothesController(IWebHostEnvironment env, IMemoryCache memoryCache)
        {
            _env = env;
            _memoryCache = memoryCache;
        }


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



        [HttpGet("get_container_id")]
        public async Task<string> GetContainerId()
        {
            return "StoreBE";
        }



        [HttpGet]
/*        [ResponseCache(Duration = 30, VaryByQueryKeys = new[] { "numberOfResults", "testNumber" })]*/
        public IEnumerable<Clothes> GetClothes(int numberOfResults, int testNumber = -1)
        {

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


            Debug.WriteLine(clothes);
            Debug.WriteLine(clothes[0].Name);
            return clothes;
            /*            return Ok(new Clothes(1, "T-Shirt", 19.99m, GetImageBytes("tshirt.png")));*/
        }






        [HttpGet("logo")]
        /*        [ResponseCache(Duration = 30, VaryByQueryKeys = new[] { "numberOfResults", "testNumber" })]*/
        public Byte[] ClothesLogo(int numberOfResults, int testNumber = -1)
        {


            return GetImageBytes("images/MerticMaster-MainLogo.PNG");
            /*            return Ok(new Clothes(1, "T-Shirt", 19.99m, GetImageBytes("tshirt.png")));*/
        }


        [HttpGet("cached")]
/*        [ResponseCache(Duration = 180, VaryByQueryKeys = new[] { "numberOfResults", "testNumber" })]*/
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



                Debug.WriteLine(testNumber.ToString(), testNumber.ToString(), testNumber.ToString(), testNumber.ToString());
            }

            connection.Close();




            // Saving the cache entry
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(3));

            _memoryCache.Set(cacheKey, clothes, cacheEntryOptions);



            Debug.WriteLine(clothes);
            Debug.WriteLine(clothes[0].Name);
            return clothes;
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



        }
    }

