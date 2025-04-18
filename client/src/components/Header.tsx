import React from 'react';
import "./Header.scss";

import transparentLogo from '../assets/logo-transparent.png'

const SiteHeader: React.FC = () => {
    return (
        <header className="site-header">
          <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <a className="navbar-logo" href="/">
                <img src={transparentLogo}></img>
              </a>
            </div>
            <ul className="navbar-menu">
              <li><a href="/menu">Menu</a></li>
              <li><a href="/about">About</a></li>
              <li className='header-reservations-button'><a href="/reservation">Reservations</a></li>
            </ul>
          </nav>
        </header>
      );
}


export default SiteHeader;