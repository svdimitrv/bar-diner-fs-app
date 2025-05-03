import React, { useState } from "react";
import { Link } from "react-router-dom";
import transparentLogo from "../assets/logo-transparent.png";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useShoppingCart } from "../contexts/ShoppingCartContextProvider";
import * as Dialog from "@radix-ui/react-dialog";
import { ShoppingCart } from "../pages/ShoppingCart";
import "../tailwind-server.css";
import "../styles/Header.scss";
import { CloseCartProvider } from "../contexts/CloseCartContentx";

const SiteHeader: React.FC = () => {
  const { cartItems } = useShoppingCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header relative">
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

          <li className="relative">
            <Dialog.Root open={open} onOpenChange={setOpen} modal>
              <Dialog.Trigger asChild>
                <div className="icon-container cursor-pointer m-0 p-0">
                  <ShoppingCartIcon className="text-white h-6 w-6 hover:text-gold" />
                  {cartItems.length > 0 && <span className="cart-badge" />}
                </div>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
                <Dialog.Content className="fixed right-0 top-0 h-full w-[90%] sm:w-[400px] bg-white z-50 shadow-lg p-0 m-0 transition-transform">
                  <div className="flex justify-between items-center mb-4">
                    <Dialog.Title className="text-xl font-bold">
                      Your Cart
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button className="text-gray-500 hover:text-black">
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </Dialog.Close>
                  </div>
                  {open && (
                    <CloseCartProvider onClose={() => setOpen(false)}>
                      <ShoppingCart />
                    </CloseCartProvider>
                  )}
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
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
