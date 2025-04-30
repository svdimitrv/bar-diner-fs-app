import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import transparentLogo from "../assets/logo-transparent.png";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import "../tailwind-server.css";
import { useShoppingCart } from "../contexts/ShoppingCartContextProvider";

const SiteHeader: React.FC = () => {
  const { cartItems } = useShoppingCart();
  return (
    <header className="site-header">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-logo" to="/">
            <img src={transparentLogo} alt="Logo" />
          </Link>
        </div>
        <ul className="navbar-menu">
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/shoppingCart" className="cart-icon-wrapper">
              <div className="icon-container">
                <ShoppingCartIcon className="text-white h-6 w-6" />
                {cartItems.length > 0 && <span className="cart-badge" />}
              </div>
            </Link>
          </li>
          <li className="header-reservations-button">
            <Link to="/reservation">Reservations</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default SiteHeader;
