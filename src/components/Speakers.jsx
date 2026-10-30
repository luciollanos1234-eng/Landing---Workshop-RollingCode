const speakerList = [
  {
    id: 1,
    nombre: 'Tomás Escudero',
    tema: 'Diseño para Developers',
    descripcion:
      'Qué mira un equipo de diseño antes de que escribas código y cómo leer un mockup para construirlo igual.',
    image: '/speakers/tomas-escudero.webp',
  },
  {
    id: 2,
    nombre: 'Franco Díaz',
    tema: 'De cero a tu primer proyecto',
    descripcion:
      'Un recorrido para pasar de mirar tutoriales a terminar una app simple con HTML, JavaScript y React.',
    image: '/speakers/franco-diaz.webp',
  },
  {
    id: 3,
    nombre: 'Gastón Roger',
    tema: 'Arma tu portafolio con IA',
    descripcion:
      'Cómo usar asistentes de IA para construir y publicar un portafolio que muestre lo que sabes hacer.',
    image: '/speakers/gaston.webp',
  },
  {
    id: 4,
    nombre: 'Mauro Coniglio',
    tema: 'Git y GitHub sin miedo',
    descripcion:
      'Los comandos que vas a usar todos los días y cómo trabajar en equipo sin pisar el código de otros.',
    image: '/speakers/mauro.webp',
  },
  {
    id: 5,
    nombre: 'José Díaz',
    tema: 'Tu primer backend con Node',
    descripcion:
      'Cómo se arma una API, qué hace una base de datos y por dónde empezar para conectar todo.',
    image: '/speakers/jose-diaz.webp',
  },
  {
    id: 6,
    nombre: 'Tomás Gómez',
    tema: 'Prepárate para tu primera entrevista',
    descripcion:
      'Qué preguntan en una entrevista técnica. Cómo practicar y cómo contar tus proyectos con claridad.',
    image: '/speakers/tomas-gomez.webp',
    portraitOrigin: '50% 20%',
  },
  {
    id: 7,
    nombre: 'Pablo Basso',
    tema: 'Mi primer trabajo en IT',
    descripcion:
      'Una charla en primera persona sobre cómo se consigue el primer puesto y qué se aprende en los primeros meses.',
    image: '/speakers/pablo-basso.webp',
    portraitOrigin: '22% 35%',
  },
  {
    id: 8,
    nombre: 'Julián Martín',
    tema: 'Testing: cómo no romper todo',
    descripcion:
      'Qué es testear: por qué importa y cómo escribir tus primeras pruebas sin complicarse.',
    image: '/speakers/julian-martin.webp',
  },
  {
    id: 9,
    nombre: 'Daniela Cardozo',
    tema: 'Tu primer día como developer',
    descripcion:
      'Qué esperar de tu primera semana en un equipo. Qué herramientas usar y cómo pedir ayuda sin miedo.',
    image: '/speakers/daniela-cardozo.webp',
  },
  {
    id: 10,
    nombre: 'Andrés Perlo',
    tema: 'Tu primera base de datos',
    descripcion:
      'Qué es una base de datos, para qué sirve y cómo guardar y consultar tus primeros datos.',
    image: '/speakers/andres-perlo.webp',
  },
];

function Speakers() {
  function moveLight(event) {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    card.style.setProperty('--light-x', `${event.clientX - bounds.left}px`);
    card.style.setProperty('--light-y', `${event.clientY - bounds.top}px`);
  }

  return (
    <section
      id="speakers"
      className="landing-container landing-section"
      aria-labelledby="speakers-title"
    >
      <div className="speakers-content">
        <p className="speakers-titulo">Speakers</p>
        <h2 id="speakers-title" className="section-title">
          Diez charlas, un mismo objetivo
        </h2>

        <div
          className="speaker-grid"
          role="region"
          aria-label="Carrusel de speakers"
          tabIndex={0}
        >
          {speakerList.map((speaker) => (
            <article
              key={speaker.id}
              className="speaker-card"
              onPointerMove={moveLight}
            >
              <div className="speaker-card__photo">
                <img
                  src={speaker.image}
                  loading="lazy"
                  width="400"
                  height="400"
                  alt={speaker.nombre}
                  className={`speaker-card__image${speaker.portraitOrigin ? ' speaker-card__image--portrait' : ''}`}
                  style={
                    speaker.portraitOrigin
                      ? { transformOrigin: speaker.portraitOrigin }
                      : undefined
                  }
                />
              </div>
              <h3 className="speaker-card__name">{speaker.nombre}</h3>
              <div className="speaker-card__topic">{speaker.tema}</div>
              <p className="speaker-card__description">{speaker.descripcion}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Speakers;
