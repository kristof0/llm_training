from pydantic import BaseModel

class ProductDTO(BaseModel):
    id: int
    name: str
    price: float
    description: str | None = None
    stock: int

class ProductCreate(BaseModel):
    name: str
    price: float
    description: str | None = None
    stock: int
    
class ProductUpdate(BaseModel):
    name: str | None = None
    price: float | None = None
    description: str | None = None
    stock: int | None = None

class BasketItemDTO(BaseModel):
    id: int
    product_id: int
    quantity: int
    product: ProductDTO

class BasketItemCreate(BaseModel):
    product_id: int
    quantity: int = 1

class BasketItemUpdate(BaseModel):
    quantity: int
