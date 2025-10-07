from contextlib import asynccontextmanager
from typing import List

from fastapi import Depends, FastAPI, HTTPException, Response, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from schemas import ProductDTO, ProductCreate, ProductUpdate, BasketItemDTO, BasketItemCreate, BasketItemUpdate
from config import settings
from database import Product, BasketItem, create_tables, get_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_tables()
    yield

app = FastAPI(title=settings.app_name, lifespan=lifespan)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://localhost:5174","http://localhost:3000"],  # Vue.js development server
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
async def root():
    return {"message": "Welcome to Kristóf's fast FastAPI API"}


@app.get("/products/", response_model=List[ProductDTO])
async def get_products(db: AsyncSession = Depends(get_db)):
    """
    Retrieves all the products.
    """
    result = await db.execute(select(Product))
    products = result.scalars().all()
    return products


@app.get("/products/{product_id}", response_model=ProductDTO)
async def get_product(product_id: int, db: AsyncSession = Depends(get_db)):
    """
    Retrieves a single product with the given ID.
    """
    result = await db.execute(select(Product).filter(Product.id == product_id))
    db_product = result.scalar_one_or_none()
    
    if db_product is None:
        raise HTTPException(status_code=404, detail="No product found with the given ID.")
        
    return db_product

@app.post("/products/", response_model=ProductDTO, status_code=status.HTTP_201_CREATED)
async def create_product(product: ProductCreate, db: AsyncSession = Depends(get_db)):
    """
    Create a new product from the given information.
    """
    db_product = Product(
        name=product.name,
        price=product.price,
        description=product.description,
        stock=product.stock
    )
    db.add(db_product)
    await db.commit()
    await db.refresh(db_product)
    return db_product


@app.put("/products/{product_id}", response_model=ProductDTO, status_code=status.HTTP_200_OK)
async def update_product(
    product_id: int,
    product_update: ProductUpdate,
    db: AsyncSession = Depends(get_db)
):
    """
    Update the product with the given ID.
    """
    result = await db.execute(select(Product).filter(Product.id == product_id))
    product = result.scalar_one_or_none()

    if product is None:
        raise HTTPException(status_code=404, detail="No product to update with the given ID.")

    # Update only the fields that are provided
    update_data = product_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(product, field, value)

    await db.commit()
    await db.refresh(product)
    return product


@app.delete("/products/{product_id}")
async def delete_product(product_id: int, db: AsyncSession = Depends(get_db)):
    """
    Delete the product with the given ID.
    """
    result = await db.execute(select(Product).filter(Product.id == product_id))
    product = result.scalar_one_or_none()

    if product is None:
        raise HTTPException(status_code=404, detail="Product not found.")

    await db.delete(product)
    await db.commit()
    return {"message": "Product deleted successfully"}


@app.get("/basket/", response_model=List[BasketItemDTO])
async def get_basket(db: AsyncSession = Depends(get_db)):
    """
    Get all items in the basket.
    """
    result = await db.execute(
        select(BasketItem).options(selectinload(BasketItem.product))
    )
    basket_items = result.scalars().all()
    return basket_items


@app.post("/basket/", response_model=BasketItemDTO, status_code=status.HTTP_201_CREATED)
async def add_to_basket(item: BasketItemCreate, db: AsyncSession = Depends(get_db)):
    """
    Add a product to the basket or increase quantity if already exists.
    """
    # Check if product exists
    product_result = await db.execute(select(Product).filter(Product.id == item.product_id))
    product = product_result.scalar_one_or_none()

    if product is None:
        raise HTTPException(status_code=404, detail="Product not found.")

    # Check if item already exists in basket
    existing_item_result = await db.execute(
        select(BasketItem).filter(BasketItem.product_id == item.product_id)
    )
    existing_item = existing_item_result.scalar_one_or_none()

    if existing_item:
        # Calculate new quantity
        new_quantity = existing_item.quantity + item.quantity

        # Validate stock availability
        if new_quantity > product.stock:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient stock. Available: {product.stock}, Requested: {new_quantity}"
            )

        # Update quantity
        existing_item.quantity = new_quantity
        await db.commit()
        await db.refresh(existing_item)

        # Load the product relationship
        result = await db.execute(
            select(BasketItem).options(selectinload(BasketItem.product))
            .filter(BasketItem.id == existing_item.id)
        )
        return result.scalar_one()
    else:
        # Validate stock availability for new item
        if item.quantity > product.stock:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient stock. Available: {product.stock}, Requested: {item.quantity}"
            )

        # Create new basket item
        db_item = BasketItem(
            product_id=item.product_id,
            quantity=item.quantity
        )
        db.add(db_item)
        await db.commit()
        await db.refresh(db_item)

        # Load the product relationship
        result = await db.execute(
            select(BasketItem).options(selectinload(BasketItem.product))
            .filter(BasketItem.id == db_item.id)
        )
        return result.scalar_one()


@app.put("/basket/{item_id}")
async def update_basket_item(
    item_id: int,
    item_update: BasketItemUpdate,
    db: AsyncSession = Depends(get_db)
):
    """
    Update the quantity of a basket item.
    """
    result = await db.execute(
        select(BasketItem).options(selectinload(BasketItem.product))
        .filter(BasketItem.id == item_id)
    )
    basket_item = result.scalar_one_or_none()

    if basket_item is None:
        raise HTTPException(status_code=404, detail="Basket item not found.")

    if item_update.quantity <= 0:
        # Remove item if quantity is 0 or negative
        await db.delete(basket_item)
        await db.commit()
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    # Validate stock availability
    if item_update.quantity > basket_item.product.stock:
        raise HTTPException(
            status_code=400,
            detail=f"Insufficient stock. Available: {basket_item.product.stock}, Requested: {item_update.quantity}"
        )

    basket_item.quantity = item_update.quantity
    await db.commit()
    await db.refresh(basket_item)

    # Load the product relationship
    result = await db.execute(
        select(BasketItem).options(selectinload(BasketItem.product))
        .filter(BasketItem.id == basket_item.id)
    )
    return result.scalar_one()


@app.delete("/basket/{item_id}")
async def remove_from_basket(item_id: int, db: AsyncSession = Depends(get_db)):
    """
    Remove an item from the basket.
    """
    result = await db.execute(select(BasketItem).filter(BasketItem.id == item_id))
    basket_item = result.scalar_one_or_none()
    
    if basket_item is None:
        raise HTTPException(status_code=404, detail="Basket item not found.")
    
    await db.delete(basket_item)
    await db.commit()
    return {"message": "Item removed from basket successfully"}


@app.delete("/basket/")
async def clear_basket(db: AsyncSession = Depends(get_db)):
    """
    Clear all items from the basket.
    """
    from sqlalchemy import delete
    await db.execute(delete(BasketItem))
    await db.commit()
    return {"message": "Basket cleared successfully"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
