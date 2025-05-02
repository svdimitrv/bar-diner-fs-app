import React from "react";

type Props = {
  onNavigate: () => void;
}

export const EmptyCartMessage: React.FC<Props> = ({ onNavigate }) => (
  <div className="flex flex-col items-center justify-center">
    <div className="empty-cart-message">Your order is still empty.</div>
    <button className="highlight-button" onClick={onNavigate}>
      Menu
    </button>
  </div>
);
