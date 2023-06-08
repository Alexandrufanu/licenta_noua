from PIL import ImageFont
from PIL import Image
from PIL import ImageDraw

# Open an Image
original_img = Image.open(r'C:\Users\AlexAsusPC\source\repos\Solution1\webapi\images\sneaker.jpg')

# Convert the image to RGB mode
# original_img = original_img.convert('RGB')

# original_img.save(fr"C:\Users\AlexAsusPC\source\repos\Solution1\webapi\images\sneaker_rgb.jpg")

myFont = ImageFont.truetype('arial', 65)


for i in range(1001):
    # Create a copy of the original image for each iteration
    img = original_img.copy()

    # Create a new ImageDraw object for each iteration
    draw = ImageDraw.Draw(img)

    # Add Text to the image
    draw.text((0, 0), f"#{i}", fill=(255, 0, 0), font=myFont)

    # Save the edited image
    img.save(fr"C:\Users\AlexAsusPC\source\repos\Solution1\image_generator\sneaker_{i}.png")

    # Cleanup
    del draw
