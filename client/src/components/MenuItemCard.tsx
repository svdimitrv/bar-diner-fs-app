import React from "react";
import { MenuItem } from "../types/MenuItem";
import "../styles/MenuItemCard.scss";
import { useShoppingCart } from "../contexts/ShoppingCartContextProvider";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import '../tailwind-server.css'

type Props = {
  item: MenuItem;
};

const MenuItemCard: React.FC<Props> = ({ item }) => {
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useShoppingCart();

  const getItemQuantity = () => {
    const cartItem = cartItems.find((i) => i.id === item.id);
    return cartItem ? cartItem.quantity : 0;
  };

  const quantity = getItemQuantity();

  const onAddItemToCart = () => {
    addToCart({ ...item, quantity: 1 });
  };

  const onIncrement = () => {
    addToCart({ ...item, quantity: 1 });
  };

  const onDecrement = () => {
    if (quantity > 1) {
      updateQuantity(item.id, quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <div className="menu-item-card">
      <h3 className="menu-header">{item.name}</h3>
      <p className="menu-description">{item.description}</p>
      <strong className="menu-description">{item.price.toFixed(2)} lv</strong>
      {item.allergens && item.allergens !== "None" && (
        <p className="menu-allergens">Allergens: {item.allergens}</p>
      )}

      {quantity === 0 ? (
        <button className="add-to-cart-button" onClick={onAddItemToCart}>
          Add to cart
        </button>
      ) : (
        <div className="cart-control">
          <button
            className="quantity-btn"
            onClick={onDecrement}
          >
            <MinusIcon className="text-black w-5 h-5" />
          </button>
          <span className="quantity-count">{quantity}</span>
          <button className="quantity-btn" onClick={onIncrement}>
            <PlusIcon className="text-black w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuItemCard;
