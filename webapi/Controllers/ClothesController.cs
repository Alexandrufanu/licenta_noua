    using Microsoft.AspNetCore.Mvc;


    using MySql.Data.MySqlClient;
    using System.Diagnostics;
    using System.Text.RegularExpressions;



    using Microsoft.AspNetCore.Hosting;
    using System.Collections.Generic;
    using System.IO;


    using Microsoft.AspNetCore.SpaServices.Prerendering;

    using System.Collections.Generic;





    namespace webapi.Controllers
    {
        [ApiController]
        [Route("api/[controller]")]
        public class ClothesController : ControllerBase
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

            public ClothesController(IWebHostEnvironment env)
            {
                _env = env;
            }




        [HttpGet]
        [ResponseCache(Duration = 30, VaryByQueryKeys = new[] { "numberOfResults", "testNumber" })]
        public IEnumerable<Clothes> GetClothes( int numberOfResults, int testNumber = -1)
        {

            string connectionString = "server=localhost;user=root;database=store_w_paths;port=3306;password=Numaistiuparole";

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

            string connectionString = "server=localhost;user=root;database=store_w_paths;port=3306;password=Numaistiuparole";

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




        private static byte[] GetImageBytes(string imageName)
        {
            // To set up env
            var imagePath = Path.Combine("C:\\Users\\AlexAsusPC\\source\\repos\\Solution1\\webapi\\", imageName);

            /*Debug.WriteLine(imagePath);*/
            return System.IO.File.ReadAllBytes(imagePath);
        }


            // creating a methid for returning all items from the database
            /*[HttpGet("all")]
            public static IEnumerable<*/



        }
    }

