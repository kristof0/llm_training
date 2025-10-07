import React, { useState } from 'react';
import { BasketItem } from '../types/Basket';

interface BasketProps {
  basketItems: BasketItem[];
  isLoading: boolean;
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  onRemoveItem: (itemId: number) => void;
  onClearBasket: () => void;
}

const Basket: React.FC<BasketProps> = ({
  basketItems,
  isLoading,
  onUpdateQuantity,
  onRemoveItem,
  onClearBasket
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const totalItems = basketItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = basketItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (isLoading) {
    return (
      <div className="basket">
        <div className="basket-header" onClick={() => setIsExpanded(!isExpanded)}>
          <h3>🛒 Basket</h3>
          <button className="btn-toggle-basket">
            {isExpanded ? '▼' : '▲'}
          </button>
        </div>
        {isExpanded && (
          <div className="basket-content">
            <p>Loading...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="basket">
      <div className="basket-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>🛒 Basket ({totalItems})</h3>
        <div className="basket-header-actions">
          {basketItems.length > 0 && isExpanded && (
            <button
              className="btn btn-clear-basket"
              onClick={(e) => {
                e.stopPropagation();
                onClearBasket();
              }}
              title="Clear basket"
            >
              🗑️
            </button>
          )}
          <button className="btn-toggle-basket">
            {isExpanded ? '▼' : '▲'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="basket-content">
          {basketItems.length === 0 ? (
            <p className="basket-empty">Your basket is empty</p>
          ) : (
            <>
              <div className="basket-items">
                {basketItems.map((item) => (
                  <div key={item.id} className="basket-item">
                    <div className="basket-item-info">
                      <h4 className="basket-item-name">{item.product.name}</h4>
                      <p className="basket-item-price">${item.product.price.toFixed(2)}</p>
                    </div>

                    <div className="basket-item-controls">
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="btn btn-remove-item"
                        onClick={() => onRemoveItem(item.id)}
                        title="Remove from basket"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="basket-total">
                <strong>Total: ${totalPrice.toFixed(2)}</strong>
              </div>

              <button className="btn btn-primary btn-checkout">
                Checkout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Basket;