


namespace webapi
{



    public class Clothes
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public byte[] Image { get; set; }

        public Clothes(int id, string name, decimal price, byte[] image)
        {
            Id = id;
            Name = name;
            Price = price;
            Image = image;
        }
    }



}
