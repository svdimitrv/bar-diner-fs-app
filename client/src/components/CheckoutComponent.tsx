import React from "react";
import { useShoppingCart } from "../contexts/ShoppingCartContextProvider";
import "../tailwind-server.css";
import ContentWrapper from "./ContentWrapper";

export const CheckoutComponent: React.FC = () => {
  const { cartItems } = useShoppingCart(); // Access cartItems from context

  return (
    <ContentWrapper>
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price} lv - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      )}
      <div className="text-black">Total items: {cartItems.length}</div>
    </ContentWrapper>
  );
};
