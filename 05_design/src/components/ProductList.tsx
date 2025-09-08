import React from 'react';
import { Product } from '../types/Product';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onView?: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, isLoading, onEdit, onDelete, onView }) => {
  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h3>No products found</h3>
        <p>Start by adding your first product!</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => onEdit(product)}
            onDelete={() => onDelete(product.id)}
            onView={onView ? () => onView(product) : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;