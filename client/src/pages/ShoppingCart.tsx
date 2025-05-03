import React from "react";
import { useShoppingCart } from "../contexts/ShoppingCartContextProvider";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../components/ContentWrapper";
import { CartItemRow } from "../components/CartItemRow";
import { CartSummary } from "../components/CartSummary";
import { EmptyCartMessage } from "../components/EmptyCartMessage";
import "../tailwind-server.css";
import '../styles/ShoppingCart.scss';
import { useCloseCart } from "../contexts/CloseCartContentx";

export const ShoppingCart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useShoppingCart();
  const navigate = useNavigate();
  const { closeCart } = useCloseCart();

  const getTotal = () => {
    return cartItems
      .reduce((sum, item) => {
        const price = Number(item.price);
        const quantity = Number(item.quantity);
        if (isNaN(price) || isNaN(quantity)) return sum;
        return sum + price * quantity;
      }, 0)
      .toFixed(2);
  };


  const onCartCheckout = () => {
    navigate('/checkout');
    closeCart();
  }

  const onClearCart = () => {
    clearCart();
    closeCart();
  }

  const onMenuButtonNavigate = () => {
    navigate('/menu');
    closeCart();
  }

  return (
    <ContentWrapper>
      <section className="shopping-cart flex flex-col items-center justify-center w-3xl h-full">
        <h1 className="cart-heading">Your Cart</h1>

        {cartItems.length > 0 ? (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onRemove={() => removeFromCart(item.id)}
                  onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                  onDecrease={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                />
              ))}
            </div>
            <CartSummary
              total={getTotal()}
              onCheckout={onCartCheckout}
              onClear={onClearCart}
            />
          </>
        ) : (
          <EmptyCartMessage onNavigate={onMenuButtonNavigate} />
        )}
      </section>
    </ContentWrapper>
  );
};
