import React, { useState } from 'react';
import { Product } from '../types/Product';
import DeleteProductDialog from './DeleteProductDialog';

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
  onView?: () => void;
  onAddToBasket: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete, onView, onAddToBasket }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    onDelete();
    setShowDeleteDialog(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="product-card">
        <div className="product-header">
          <h3 className="product-name">{product.name}</h3>
        </div>
        
        {product.description && (
          <div className="product-description">
            {product.description}
          </div>
        )}
        
        <div className="product-details">
          <div className="product-price">
            <span className="price-value">${product.price.toFixed(2)}</span>
          </div>
          
          <div className="product-stock">
            <span className="stock-label">Stock:</span>
            <span className="stock-value">{product.stock}</span>
          </div>
          
          <button 
            className="btn btn-add-to-basket"
            onClick={onAddToBasket}
            disabled={product.stock === 0}
            title="Add to basket"
          >
            ➕
          </button>
        </div>
        
        <div className="product-actions">
          <button 
            className="btn btn-view"
            onClick={onView}
          >
            View
          </button>
          <button 
            className="btn btn-edit"
            onClick={onEdit}
          >
            Edit
          </button>
          <button 
            className="btn btn-delete"
            onClick={handleDeleteClick}
          >
            🗑️
          </button>
        </div>
      </div>

      {showDeleteDialog && (
        <DeleteProductDialog
          product={product}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </>
  );
};

export default ProductCard;