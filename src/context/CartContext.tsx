'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem } from '@/types';

interface ToastState {
  id: number;
  message: string;
  image?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  isOpen: boolean;
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }, openDrawer?: boolean) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: number;
  totalPrice: number;
  isItemInCart: (id: string) => boolean;
  toast: ToastState | null;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'hmec_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when cartItems change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems, isLoaded]);

  const showToast = (message: string, image?: string) => {
    const toastId = Date.now();
    setToast({ id: toastId, message, image });
    setTimeout(() => {
      setToast((current) => (current?.id === toastId ? null : current));
    }, 3500);
  };

  const dismissToast = () => setToast(null);

  const addToCart = (
    itemData: Omit<CartItem, 'quantity'> & { quantity?: number },
    openDrawer: boolean = false
  ) => {
    const addQty = itemData.quantity && itemData.quantity > 0 ? itemData.quantity : 1;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === itemData.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + addQty,
        };
        return updated;
      }
      return [...prev, { ...itemData, quantity: addQty }];
    });

    const itemName = itemData.nameAr || itemData.nameEn || 'المنتج';
    showToast(`تمت إضافة "${itemName}" إلى السلة 🛒`, itemData.image);

    if (openDrawer) {
      setIsOpen(true);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.unitPrice || 0) * item.quantity,
    0
  );

  const isItemInCart = (id: string) => cartItems.some((item) => item.id === id);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        totalItems,
        totalPrice,
        isItemInCart,
        toast,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
