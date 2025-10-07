import { Product } from './Product';

export interface BasketItem {
  id: number;
  product_id: number;
  quantity: number;
  product: Product;
}

export interface BasketItemCreate {
  product_id: number;
  quantity?: number;
}

export interface BasketItemUpdate {
  quantity: number;
}