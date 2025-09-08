export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
}

export interface ProductFormData {
  name: string;
  description?: string;
  price: number;
  stock: number;
}

export interface ProductFormErrors {
  name?: string;
  price?: string;
  stock?: string;
}