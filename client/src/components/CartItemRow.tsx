import React from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { MenuItem } from "../types/MenuItem";

type Props = {
  item: MenuItem;
  onRemove: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const CartItemRow: React.FC<Props> = ({
  item,
  onRemove,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="cart-item">
      <div className="item-info">
        <h2>{item.name}</h2>
        <p className="quantity-controls">
          Quantity:
          <button
            className="icon-button"
            onClick={onDecrease}
            disabled={item.quantity <= 1}
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="quantity-value">{item.quantity}</span>
          <button className="icon-button" onClick={onIncrease}>
            <PlusIcon className="h-4 w-4" />
          </button>
        </p>
      </div>
      <div className="item-price">
        €{(Number(item.price) * Number(item.quantity)).toFixed(2)}
      </div>
      <button className="remove-button" onClick={onRemove}>
        &times;
      </button>
    </div>
  );
};
