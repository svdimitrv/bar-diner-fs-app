import React from "react";
import { MenuItem } from "./MenuList";
import "./MenuItemCard.scss";
import { useShoppingCart } from "../contexts/ShoppingCartContextProvider";

type Props = {
  item: MenuItem;
};

const MenuItemCard: React.FC<Props> = ({ item }) => {
  const { addToCart } = useShoppingCart();

  const onAddItemToCart = () => {
    addToCart({ ...item, quantity: 1 });
  };

  return (
    <div className="menu-item-card">
      <h3 className="menu-header">{item.name}</h3>
      <p className="menu-description">{item.description}</p>
      <strong className="menu-description">{item.price.toFixed(2)} lv</strong>
      {item.allergens && (
        <p className="menu-allergens">{item.allergens}</p>
      )}
      <button className="add-to-cart-button" onClick={onAddItemToCart}>
        Add to cart
      </button>
    </div>
  );
};

export default MenuItemCard;
