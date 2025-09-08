import React from 'react';
import { Product } from '../types/Product';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content product-details-dialog">
        <div className="modal-header">
          <h2>{product.name}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="modal-body">
          {product.description && (
            <div className="detail-description">
              <p>{product.description}</p>
            </div>
          )}
          
          <hr className="separator" />
          
          <div className="detail-row">
            <div className="detail-section">
              <label>Price:</label>
              <span className="detail-value price">${product.price.toFixed(2)}</span>
            </div>
            
            <div className="detail-section">
              <label>Stock:</label>
              <span className="detail-value">{product.stock} units</span>
            </div>
          </div>
          
          <div className="detail-section">
            <label>Product ID:</label>
            <span className="detail-value">{product.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;