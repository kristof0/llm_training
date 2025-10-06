import asyncio
from sqlalchemy import select
from database import AsyncSessionLocal, Product, create_tables

async def seed_products():
    """Seed the database with initial product data for development"""

    # Sample products
    sample_products = [
        {
            "name": "Laptop",
            "price": 999.99,
            "description": "High-performance laptop with 16GB RAM and 512GB SSD",
            "stock": 15
        },
        {
            "name": "Wireless Mouse",
            "price": 29.99,
            "description": "Ergonomic wireless mouse with USB receiver",
            "stock": 50
        },
        {
            "name": "Mechanical Keyboard",
            "price": 89.99,
            "description": "RGB mechanical keyboard with blue switches",
            "stock": 25
        },
        {
            "name": "USB-C Cable",
            "price": 12.99,
            "description": "2-meter USB-C charging cable",
            "stock": 100
        },
        {
            "name": "Webcam HD",
            "price": 59.99,
            "description": "1080p webcam with built-in microphone",
            "stock": 30
        },
        {
            "name": "Monitor 27 inch",
            "price": 299.99,
            "description": "27-inch 4K UHD monitor with HDR support",
            "stock": 12
        },
        {
            "name": "Desk Lamp",
            "price": 34.99,
            "description": "LED desk lamp with adjustable brightness",
            "stock": 40
        },
        {
            "name": "External SSD 1TB",
            "price": 129.99,
            "description": "Portable external SSD with 1TB storage",
            "stock": 20
        },
        {
            "name": "Headphones",
            "price": 149.99,
            "description": "Noise-cancelling over-ear headphones",
            "stock": 18
        },
        {
            "name": "Phone Stand",
            "price": 15.99,
            "description": "Adjustable phone stand for desk",
            "stock": 60
        }
    ]

    # Create tables if they don't exist
    await create_tables()

    async with AsyncSessionLocal() as session:
        # Check if products already exist
        result = await session.execute(select(Product))
        existing_products = result.scalars().all()

        if existing_products:
            print(f"Database already has {len(existing_products)} products.")
            user_input = input("Do you want to add more sample products anyway? (y/n): ")
            if user_input.lower() != 'y':
                print("Skipping seed.")
                return

        # Add sample products
        for product_data in sample_products:
            product = Product(**product_data)
            session.add(product)

        await session.commit()
        print(f"Successfully seeded {len(sample_products)} products!")

if __name__ == "__main__":
    asyncio.run(seed_products())
