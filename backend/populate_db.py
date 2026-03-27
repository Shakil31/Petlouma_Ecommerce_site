import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from shop.models import Category, Product

def populate():
    print("Populating dummy data for PetLouma...")
    
    # Categories
    dogs, _ = Category.objects.get_or_create(name='Dogs', slug='dogs', description='Everything for your canine friends.')
    cats, _ = Category.objects.get_or_create(name='Cats', slug='cats', description='Premium goods for your feline companions.')
    birds, _ = Category.objects.get_or_create(name='Birds', slug='birds', description='Supplies for your winged pets.')
    
    # Products
    products = [
        (dogs, 'Premium Dog Food', 'premium-dog-food', 'High quality, grain-free dog food loaded with vitamins.', 45.99, 100, 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&q=80'),
        (dogs, 'Plush Dog Bed', 'plush-dog-bed', 'Ultra soft memory foam bed for dogs of all sizes. Built to last.', 89.99, 50, 'https://images.unsplash.com/photo-1541599540903-216ea568f119?w=800&q=80'),
        (cats, 'Interactive Cat Toy', 'interactive-cat-toy', 'Laser and feather interactive toy that will keep your cat entertained for hours.', 24.50, 200, 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&q=80'),
        (cats, 'Organic Catnip', 'organic-catnip', '100% natural organic catnip grown in a pristine environment.', 12.00, 150, 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80'),
        (birds, 'Large Bird Cage', 'large-bird-cage', 'Spacious and durable bird cage. Easy to clean.', 120.00, 20, 'https://images.unsplash.com/photo-1552728089-57169ab00661?w=800&q=80'),
        (dogs, 'Tough Chew Bone', 'tough-chew-bone', 'Indestructible chew toy for heavy chewers.', 15.99, 300, 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80'),
    ]
    
    for cat, name, slug, desc, price, stock, img_url in products:
        Product.objects.update_or_create(
            slug=slug,
            defaults={
                'category': cat,
                'name': name,
                'description': desc,
                'price': price,
                'stock': stock,
                'available': True,
                'image_url': img_url
            }
        )

    print("Database populated successfully.")

if __name__ == '__main__':
    populate()
