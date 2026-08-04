import { Flower, User, CartItem } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

const getHeaders = () => {
  const token = localStorage.getItem('freshflora_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Auth
  login: async (credentials: any) => {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },
  
  register: async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  // Products
  getProducts: async (params: any = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.size) query.append('size', params.size);
    if (params.searchQuery) query.append('search', params.searchQuery);
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.maxPrice) query.append('max_price', params.maxPrice);
    if (params.availability && params.availability !== 'All') query.append('availability', params.availability);
    
    // Sort logic
    if (params.sortBy === 'price-low') {
      query.append('sort_by', 'price');
      query.append('sort_order', 'asc');
    } else if (params.sortBy === 'price-high') {
      query.append('sort_by', 'price');
      query.append('sort_order', 'desc');
    }

    const response = await fetch(`${API_BASE_URL}/products?${query.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    
    // Map backend Product to frontend Flower
    return {
      ...data,
      items: data.items.map((item: any): Flower => ({
        id: item.id,
        title: item.name,
        description: item.description,
        price: item.price,
        category: item.category as any,
        availability: item.stock === 0 ? 'Out of Stock' : (item.availability || 'In Stock'),
        rating: 4.5,
        reviewCount: 0,
        ordersCount: item.orders || 0,
        stock: item.stock || 0,
        imageUrl: item.image_url,
        flowerColor: 'Mixed', // Default mapping
        stemCount: 12,
        tags: [],
        isHot: item.is_hot
      }))
    };
  },

  getHotProducts: async (params: any = {}) => {
    const query = new URLSearchParams();
    if (params.size) query.append('size', params.size);

    const response = await fetch(`${API_BASE_URL}/products/hot?${query.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch hot products');
    const data = await response.json();
    return data.items.map((item: any): Flower => ({
      id: item.id,
      title: item.name,
      description: item.description,
      price: item.price,
      category: item.category as any,
      availability: item.stock === 0 ? 'Out of Stock' : (item.availability || 'In Stock'),
      rating: 4.5,
      reviewCount: 0,
      ordersCount: item.orders || 0,
      stock: item.stock || 0,
      imageUrl: item.image_url,
      flowerColor: 'Mixed',
      stemCount: 12,
      tags: [],
      isHot: item.is_hot
    }));
  },

  createOrder: async (orderData: { total_amount: number, items: any[] }) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Please login to place an order!');
      }
      const errText = await response.text();
      try {
        const errObj = JSON.parse(errText);
        throw new Error(errObj.detail || 'Failed to create order');
      } catch {
        throw new Error(errText || 'Failed to create order');
      }
    }
    return response.json();
  },

  getOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  }
};
