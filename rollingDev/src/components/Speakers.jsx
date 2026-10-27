import { useEffect, useRef, useState } from 'react'

const speakerList = [
  { id: 1, nombre: "Tomás Escudero", tema: "Diseño para Developers", descripcion: "Qué mira un equipo de diseño antes de que escribas código y cómo leer un mockup para construirlo igual.", image: '/speakers/tomas-escudero.webp' },
  { id: 2, nombre: "Franco Díaz", tema: "De cero a tu primer proyecto", descripcion: "Un recorrido para pasar de mirar tutoriales a terminar una app simple con HTML, JavaScript y React.", image: '/speakers/franco-diaz.webp' },
  { id: 3, nombre: "Gastón", tema: "Arma tu portafolio con IA", descripcion: "Cómo usar asistentes de IA para construir y publicar un portafolio que muestre lo que sabes hacer.", image: '/speakers/gaston.webp' },
  { id: 4, nombre: "Mauro", tema: "Git y GitHub sin miedo", descripcion: "Los comandos que vas a usar todos los días y cómo trabajar en equipo sin pisar el código de otros.", image: '/speakers/mauro.webp' },
  { id: 5, nombre: "José Díaz", tema: "Tu primer backend con Node", descripcion: "Cómo se arma una API, qué hace una base de datos y por dónde empezar para conectar todo.", image: '/speakers/jose-diaz.webp' },
  { id: 6, nombre: "Tomás Gómez", tema: "Prepárate para tu primera entrevista", descripcion: "Qué preguntan en una entrevista técnica. Cómo practicar y cómo contar tus proyectos con claridad.", image: '/speakers/tomas-gomez.webp', portraitOrigin: '50% 20%' },
  { id: 7, nombre: "Pablo Basso", tema: "Mi primer trabajo en IT", descripcion: "Una charla en primera persona sobre cómo se consigue el primer puesto y qué se aprende en los primeros meses.", image: '/speakers/pablo-basso.webp', portraitOrigin: '22% 35%' },
  { id: 8, nombre: "Julián Martín", tema: "Testing: cómo no romper todo", descripcion: "Qué es testear: por qué importa y cómo escribir tus primeras pruebas sin complicarse.", image: '/speakers/julian-martin.webp' },
  { id: 9, nombre: "Daniela Cardozo", tema: "Tu primer día como developer", descripcion: "Qué esperar de tu primera semana en un equipo. Qué herramientas usar y cómo pedir ayuda sin miedo.", image: '/speakers/daniela-cardozo.webp' },
  { id: 10, nombre: "Andrés Perlo", tema: "Tu primera base de datos", descripcion: "Qué es una base de datos, para qué sirve y cómo guardar y consultar tus primeros datos.", image: '/speakers/andres-perlo.webp' },
]

function Speakers() {
  const track = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const element = track.current
    const update = () => {
      const cards = [...element.children]
      const closest = cards.reduce((best, card, index) => Math.abs(card.offsetLeft - element.scrollLeft) < Math.abs(cards[best].offsetLeft - element.scrollLeft) ? index : best, 0)
      setActive(closest)
    }
    element.addEventListener('scroll', update, { passive: true })
    const resize = new ResizeObserver(update)
    resize.observe(element)
    return () => { element.removeEventListener('scroll', update); resize.disconnect() }
  }, [])

  function goTo(index) {
    const next = Math.max(0, Math.min(index, speakerList.length - 1))
    track.current.scrollTo({ left: track.current.children[next].offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  function moveLight(event) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const card = event.currentTarget
    const bounds = card.getBoundingClientRect()
    card.style.setProperty('--light-x', `${event.clientX - bounds.left}px`)
    card.style.setProperty('--light-y', `${event.clientY - bounds.top}px`)
  }

  return (
    <section id="speakers" className="landing-container landing-section" aria-labelledby="speakers-title">
      <div className="speakers-content">
        <p className="speakers-titulo">
          Speakers
        </p>
        <h2 id="speakers-title" className="section-title">
          Diez charlas, un mismo objetivo
        </h2>

        <div className="speaker-carousel-tools">
          <p>Usá las flechas o deslizá para conocer a los oradores</p>
          <div><button type="button" aria-label="Speaker anterior" disabled={active === 0} onClick={() => goTo(active - 1)}>‹</button><button type="button" aria-label="Speaker siguiente" disabled={active === speakerList.length - 1} onClick={() => goTo(active + 1)}>›</button></div>
        </div>
        <div ref={track} id="speaker-carousel" className="speaker-grid" tabIndex={0} role="region" aria-label="Charlas y speakers" onKeyDown={event => {
          if (!window.matchMedia('(max-width: 700px)').matches) return
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); goTo(active + (event.key === 'ArrowRight' ? 1 : -1)) }
        }}>
          {speakerList.map((speaker) => (
            <article key={speaker.id} className="speaker-card" onPointerMove={moveLight}>
              <div className="speaker-card__photo">
              <img
                src={speaker.image}
                loading="lazy"
                width="400" height="400"
                alt={speaker.nombre}
                className={`speaker-card__image${speaker.portraitOrigin ? ' speaker-card__image--portrait' : ''}`}
                style={speaker.portraitOrigin ? { transformOrigin: speaker.portraitOrigin } : undefined}
              />
              </div>
              <h3 className="speaker-card__name">{speaker.nombre}</h3>
              <div
                className="speaker-card__topic"
              >
                {speaker.tema}
              </div>
              <p className="speaker-card__description">{speaker.descripcion}</p>
            </article>
          ))}
        </div>
        <div className="speaker-carousel-dots" aria-label="Elegir speaker">
          {speakerList.map((speaker,index) => <button type="button" key={speaker.id} aria-label={`Ver a ${speaker.nombre}`} aria-controls="speaker-carousel" aria-current={index === active ? 'true' : undefined} onClick={() => goTo(index)}><span /></button>)}
        </div>
      </div>
    </section>
  )
}

export default Speakers
