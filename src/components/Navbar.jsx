import { useState } from 'react';
import logo from '../assets/logo-rolling-blanco.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-nav">
      <nav
        className="landing-container site-nav__inner"
        aria-label="Navegación principal"
      >
        <a
          href="#inicio"
          aria-label="Rolling Code, inicio"
          onClick={() => setIsOpen(false)}
        >
          <img src={logo} alt="Rolling Code School" className="nav-logo" />
        </a>
        <button
          className="site-nav__toggle"
          type="button"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          aria-controls="site-nav-links"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <div
          id="site-nav-links"
          className={`site-nav__links${isOpen ? ' is-open' : ''}`}
        >
          <a href="#speakers" onClick={() => setIsOpen(false)}>
            Speakers
          </a>
          <a href="#agenda" onClick={() => setIsOpen(false)}>
            Agenda
          </a>
          <a href="#como-llegar" onClick={() => setIsOpen(false)}>
            Cómo llegar
          </a>
          <a href="#sponsors" onClick={() => setIsOpen(false)}>
            Sponsors
          </a>
          <a
            className="rc-button rc-button--red"
            href="#entradas"
            onClick={() => setIsOpen(false)}
          >
            Comprar entrada
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
