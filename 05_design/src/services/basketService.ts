import axios from 'axios';
import { BasketItem, BasketItemCreate, BasketItemUpdate } from '../types/Basket';
import { API_CONFIG } from '../config/api';

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const basketService = {
  async getBasket(): Promise<BasketItem[]> {
    try {
      const response = await api.get<BasketItem[]>('/basket/');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch basket:', error);
      throw error;
    }
  },

  async addToBasket(item: BasketItemCreate): Promise<BasketItem> {
    try {
      const response = await api.post<BasketItem>('/basket/', item);
      return response.data;
    } catch (error) {
      console.error('Failed to add item to basket:', error);
      throw error;
    }
  },

  async updateBasketItem(id: number, update: BasketItemUpdate): Promise<BasketItem | null> {
    try {
      const response = await api.put<BasketItem>(`/basket/${id}`, update);
      // Handle 204 No Content response (item removed when quantity is 0)
      if (response.status === 204) {
        return null;
      }
      return response.data;
    } catch (error) {
      console.error('Failed to update basket item:', error);
      throw error;
    }
  },

  async removeFromBasket(id: number): Promise<void> {
    try {
      await api.delete(`/basket/${id}`);
    } catch (error) {
      console.error('Failed to remove item from basket:', error);
      throw error;
    }
  },

  async clearBasket(): Promise<void> {
    try {
      await api.delete('/basket/');
    } catch (error) {
      console.error('Failed to clear basket:', error);
      throw error;
    }
  },
};