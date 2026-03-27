import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const response = await api.get('orders/cart/my_cart/');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart', error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }
    try {
      await api.post('orders/cart/add_item/', { product: productId, quantity });
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await api.post('orders/cart/remove_item/', { item_id: itemId });
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
