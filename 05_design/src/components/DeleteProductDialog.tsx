import React from 'react';
import { Product } from '../types/Product';

interface DeleteProductDialogProps {
  product: Product;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({ product, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content delete-dialog">
        <div className="modal-header">
          <h2>Delete Product</h2>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete "{product.name}"? This action cannot be undone.</p>
        </div>
        <div className="modal-actions">
          <button 
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className="btn btn-danger"
            onClick={onConfirm}
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductDialog;