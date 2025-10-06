import axios from 'axios';
import { BasketItem, BasketItemCreate, BasketItemUpdate } from '../types/Basket';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const basketService = {
  async getBasket(): Promise<BasketItem[]> {
    const response = await api.get<BasketItem[]>('/basket/');
    return response.data;
  },

  async addToBasket(item: BasketItemCreate): Promise<BasketItem> {
    const response = await api.post<BasketItem>('/basket/', item);
    return response.data;
  },

  async updateBasketItem(id: number, update: BasketItemUpdate): Promise<BasketItem> {
    const response = await api.put<BasketItem>(`/basket/${id}`, update);
    return response.data;
  },

  async removeFromBasket(id: number): Promise<void> {
    await api.delete(`/basket/${id}`);
  },

  async clearBasket(): Promise<void> {
    await api.delete('/basket/');
  },
};