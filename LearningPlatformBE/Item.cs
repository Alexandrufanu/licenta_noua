

namespace webapi
{



    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }

        public decimal Price { get; set; }
        public byte[] Image { get; set; }

        public Item(int id, string name, string description, string content, byte[] image)
        {
            Id = id;
            Name = name;
            Description = description;
            Content = content;
            Image = image;

        }
    }



}

 