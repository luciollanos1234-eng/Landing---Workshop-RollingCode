import logo from "../assets/logo-rolling-blanco.png";

const Navbar = () => {
  return (
    <div>
      <header className="site-nav">
        <nav
          className="landing-container flex flex-wrap items-center justify-between gap-5 py-5"
          aria-label="Navegación principal"
        >
          <a href="#inicio" aria-label="Rolling Code, inicio">
            <img src={logo} alt="Rolling Code School" className="nav-logo" />
          </a>
          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold sm:gap-6">
            <a href="#speakers">Speakers</a>
            <a href="#agenda">Agenda</a>
            <a href="#como-llegar">Cómo llegar</a>
            <a href="#sponsors">Sponsors</a>
            <a className="rc-button rc-button--red" href="#entradas">
              Comprar entrada
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
