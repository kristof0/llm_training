import axios from 'axios';
import { Product, ProductFormData } from '../types/Product';
import { API_CONFIG } from '../config/api';

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data matching the Figma design
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 199.99,
    stock: 25
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors. Made from 100% organic materials.",
    price: 29.99,
    stock: 50
  },
  {
    id: 3,
    name: "Smart Coffee Maker",
    description: "WiFi-enabled coffee maker with programmable settings and smartphone app control. Brew perfect coffee every time.",
    price: 149.99,
    stock: 15
  },
  {
    id: 4,
    name: "Yoga Mat Premium",
    description: "Non-slip premium yoga mat with excellent grip and cushioning for all yoga practices. Eco-friendly materials.",
    price: 79.99,
    stock: 30
  },
  {
    id: 5,
    name: "JavaScript: The Complete Guide",
    description: "Comprehensive guide to modern JavaScript programming with practical examples and projects. Updated for 2024.",
    price: 39.99,
    stock: 100
  },
  {
    id: 6,
    name: "Moisturizing Face Cream",
    description: "Hydrating face cream with natural ingredients suitable for all skin types. Dermatologist tested and approved.",
    price: 24.99,
    stock: 75
  }
];

export const productService = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await api.get<Product[]>('/products/');
      return response.data;
    } catch (error) {
      // Return mock data if backend is not available
      console.log('Backend not available, using mock data');
      return mockProducts;
    }
  },

  async getProduct(id: number): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  async createProduct(product: ProductFormData): Promise<Product> {
    const response = await api.post<Product>('/products/', product);
    return response.data;
  },

  async updateProduct(id: number, product: ProductFormData): Promise<Product> {
    const response = await api.put<Product>(`/products/${id}`, product);
    return response.data;
  },

  async deleteProduct(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};