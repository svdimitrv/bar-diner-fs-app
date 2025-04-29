import React from "react";
import { useShoppingCart } from "../contexts/ShoppingCartContextProvider";
import { useNavigate } from "react-router-dom";
import "./ShoppingCart.scss";
import ContentWrapper from "./ContentWrapper";

export const ShoppingCart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useShoppingCart();
  const navigate = useNavigate();

  const getTotal = () => {
    return cartItems
      .reduce((sum, item) => {
        const price = Number(item.price);
        const quantity = Number(item.quantity);

        if (isNaN(price) || isNaN(quantity)) {
          console.warn("Invalid cart item:", item);
          return sum;
        }

        return sum + price * quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <ContentWrapper>
      <section className="shopping-cart">
        <h1 className="cart-heading">Your Cart</h1>

        {cartItems.length > 0 ? (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <h2>{item.name}</h2>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div>
                    <input
                      className="quantity-input"
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                    ></input>
                  </div>
                  <div className="item-price">
                    €{(Number(item.price) * Number(item.quantity)).toFixed(2)}
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>€{getTotal()}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>€{(parseFloat(getTotal()) * 1.2).toFixed(2)}</span>
              </div>
              <div className="buttons-container">
                <button
                  className="checkout-button"
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </button>
                <button className="clear-cart-button" onClick={clearCart}>
                  Clear
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-cart-message">Your order is still empty.</div>
        )}
      </section>
    </ContentWrapper>
  );
};
