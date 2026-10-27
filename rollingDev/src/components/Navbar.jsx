import { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo-rolling-blanco.png'

const links = [
  ['#speakers', 'Speakers'],
  ['#agenda', 'Agenda'],
  ['#como-llegar', 'Cómo llegar'],
  ['#sponsors', 'Sponsors'],
  ['#entradas', 'Comprar entrada'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const dialog = useRef(null)

  useEffect(() => {
    if (!open) return
    const panel = dialog.current
    const previousOverflow = document.body.style.overflow
    panel.showModal()
    document.body.style.overflow = 'hidden'
    const desktop = window.matchMedia('(min-width: 701px)')
    const onResize = event => { if (event.matches) setOpen(false) }
    desktop.addEventListener('change', onResize)
    return () => {
      desktop.removeEventListener('change', onResize)
      panel.close()
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return <header className="site-nav">
    <nav className="landing-container flex flex-wrap items-center justify-between gap-5 py-5" aria-label="Navegación principal">
      <a href="#inicio" aria-label="Rolling Code, inicio"><img src={logo} alt="Rolling Code School" className="nav-logo" /></a>
      <div className="desktop-navigation flex flex-wrap items-center gap-4 text-sm font-semibold sm:gap-6">
        {links.map(([href,label]) => <a key={href} href={href} className={href === '#entradas' ? 'rc-button rc-button--red' : undefined}>{label}</a>)}
      </div>
      <button type="button" className="mobile-menu-toggle" aria-label="Abrir menú" aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}>
        <span /><span /><span />
      </button>
    </nav>
    <dialog ref={dialog} id="mobile-navigation" className="mobile-menu" aria-label="Menú de navegación" onClose={() => setOpen(false)}>
      <div className="mobile-menu__header">
        <img src={logo} alt="Rolling Code School" />
      </div>
      <nav className="mobile-menu__links" aria-label="Secciones de la página">
        {links.map(([href,label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <button type="button" className="mobile-menu__close" aria-label="Cerrar menú" onClick={() => setOpen(false)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
      </button>
    </dialog>
  </header>
}
