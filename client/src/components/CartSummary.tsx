import React from "react";

type Props = {
  total: string;
  onCheckout: () => void;
  onClear: () => void;
}

export const CartSummary: React.FC<Props> = ({
  total,
  onCheckout,
  onClear,
}) => {
  const grandTotal = (parseFloat(total) * 1.2).toFixed(2);

  return (
    <div className="cart-summary">
      <div className="summary-row">
        <span>Subtotal</span>
        <span>€{total}</span>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <span>€{grandTotal}</span>
      </div>
      <div className="buttons-container">
        <button className="checkout-button" onClick={onCheckout}>
          Checkout
        </button>
        <button className="clear-cart-button" onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  );
};
