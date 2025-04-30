  import React, { createContext, useContext, useState } from "react";
  import { MenuItem } from "../components/MenuList";

  type ShoppingCartContextType = {
      cartItems: MenuItem[];
      addToCart: (item: MenuItem) => void;
      removeFromCart: (id: number) => void;
      updateQuantity: (id: number, quantity: number) => void;
      clearCart: () => void;
  };

  const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

  type ShoppingCartProviderProps = {
      children: React.ReactNode;
  };

  export const ShoppingCartContextProvider = ({ children }: ShoppingCartProviderProps) => {
      const [cartItems, setCartItems] = useState<MenuItem[]>([]);

      const addToCart = (item: MenuItem) => {
          setCartItems((prev) => {
            const existingItem = prev.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
              return prev.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              );
            } else {
              return [...prev, { ...item, quantity: 1 }];
            }
          });
        };      

      const removeFromCart = (id: number) => {
          setCartItems((prev) => prev.filter((item) => item.id !== id));
      };

      const updateQuantity = (id: number, quantity: number) => {
          setCartItems((currentItems) =>
            currentItems.map((item) =>
              item.id === id ? { ...item, quantity: Number(quantity) } : item
            )
          );
        };

      const clearCart = () => {
          setCartItems([]);
      }

      return (
          <ShoppingCartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
              {children}
          </ShoppingCartContext.Provider>
      );
  };

  export const useShoppingCart = () => {
      const context = useContext(ShoppingCartContext);
      if (!context) {
          throw new Error("useShoppingCart must be used within a ShoppingCartContextProvider");
      }
      return context;
  };
