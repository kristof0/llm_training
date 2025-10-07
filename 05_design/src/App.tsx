import React, { useState, useEffect } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetails from './components/ProductDetails';
import Basket from './components/Basket';
import { Product, ProductFormData } from './types/Product';
import { BasketItem } from './types/Basket';
import { productService } from './services/productService';
import { basketService } from './services/basketService';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBasketLoading, setIsBasketLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProducts();
    loadBasket();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const fetchedProducts = await productService.getProducts();
      setProducts(fetchedProducts);
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadBasket = async () => {
    try {
      setIsBasketLoading(true);
      const basket = await basketService.getBasket();
      setBasketItems(basket);
    } catch (err) {
      console.error('Error loading basket:', err);
      // Don't show error for basket loading failure - it's not critical
    } finally {
      setIsBasketLoading(false);
    }
  };

  const handleCreateProduct = async (productData: ProductFormData) => {
    try {
      const newProduct = await productService.createProduct(productData);
      setProducts([...products, newProduct]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to create product');
      console.error('Error creating product:', err);
    }
  };

  const handleUpdateProduct = async (id: number, productData: ProductFormData) => {
    try {
      const updatedProduct = await productService.updateProduct(id, productData);
      setProducts(products.map(p => p.id === id ? updatedProduct : p));
      setEditingProduct(null);
      setError(null);
    } catch (err) {
      setError('Failed to update product');
      console.error('Error updating product:', err);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await productService.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete product');
      console.error('Error deleting product:', err);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleViewProduct = (product: Product) => {
    setViewingProduct(product);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleCloseDetails = () => {
    setViewingProduct(null);
  };

  const handleAddToBasket = async (productId: number) => {
    try {
      await basketService.addToBasket({ product_id: productId, quantity: 1 });
      await loadBasket(); // Refresh basket
    } catch (err) {
      setError('Failed to add item to basket');
      console.error('Error adding to basket:', err);
    }
  };

  const handleUpdateBasketQuantity = async (itemId: number, quantity: number) => {
    try {
      await basketService.updateBasketItem(itemId, { quantity });
      await loadBasket(); // Refresh basket
    } catch (err) {
      setError('Failed to update basket item');
      console.error('Error updating basket item:', err);
    }
  };

  const handleRemoveFromBasket = async (itemId: number) => {
    try {
      await basketService.removeFromBasket(itemId);
      await loadBasket(); // Refresh basket
    } catch (err) {
      setError('Failed to remove item from basket');
      console.error('Error removing from basket:', err);
    }
  };

  const handleClearBasket = async () => {
    try {
      await basketService.clearBasket();
      await loadBasket(); // Refresh basket
    } catch (err) {
      setError('Failed to clear basket');
      console.error('Error clearing basket:', err);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>Product Management</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
            disabled={showForm}
          >
            Add Product
          </button>
        </header>

        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)} className="error-close">×</button>
          </div>
        )}

        {showForm && (
          <ProductForm
            product={editingProduct}
            onSubmit={editingProduct ? 
              (data) => handleUpdateProduct(editingProduct.id, data) : 
              handleCreateProduct
            }
            onCancel={handleCancelForm}
          />
        )}

        <ProductList
          products={filteredProducts}
          isLoading={isLoading}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onView={handleViewProduct}
          onAddToBasket={handleAddToBasket}
        />

        <Basket
          basketItems={basketItems}
          isLoading={isBasketLoading}
          onUpdateQuantity={handleUpdateBasketQuantity}
          onRemoveItem={handleRemoveFromBasket}
          onClearBasket={handleClearBasket}
        />

        {viewingProduct && (
          <ProductDetails
            product={viewingProduct}
            onClose={handleCloseDetails}
          />
        )}
      </div>
    </div>
  );
}

export default App;