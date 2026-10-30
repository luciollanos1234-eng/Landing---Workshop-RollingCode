import calendar from '../assets/calendario.svg';
import location from '../assets/ubicacion.svg';
import ticket from '../assets/entrada.svg';

const facts = [
  { icon: calendar, title: 'JUE 19/11', detail: '18.00 hs', date: true },
  {
    icon: location,
    title: 'Rolling Code School',
    detail: 'Gral. Paz 576, Entrepiso',
  },
  {
    icon: ticket,
    title: 'Entradas desde $15.000',
    detail: 'Early Bird hasta el 30/10',
  },
];

export default function Header() {
  return (
    <>
      <section className="hero-shell" aria-labelledby="hero-title">
        <div className="hero-panel">
          <div className="hero-code-background" aria-hidden="true">
            <svg
              className="hero-code-background__network"
              viewBox="0 0 1200 720"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
            >
              <path d="M-60 180 180 80 420 200 700 100 940 240 1260 120M-60 540 220 400 460 580 740 440 1000 600 1260 460M180 80 220 400 420 200 460 580 700 100 740 440 940 240 1000 600" />
              {[
                [180, 80],
                [420, 200],
                [700, 100],
                [940, 240],
                [220, 400],
                [460, 580],
                [740, 440],
                [1000, 600],
              ].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />
              ))}
            </svg>
            <div className="hero-code-background__code">
              <span>{'const nextStep = await learn();'}</span>
              <span>{'<Workshop community="Rolling Code" />'}</span>
              <span>{'git commit -m "mi primer proyecto"'}</span>
              <span>{'function start() { return build(); }'}</span>
            </div>
          </div>
          <div className="hero-copy">
            <p className="hero-eyebrow">
              <em>Workshop</em> entradas limitadas
            </p>
            <h1 id="hero-title">
              ¿POR DÓNDE
              <br />
              EMPIEZO A<br />
              <span>PROGRAMAR?</span>
            </h1>
            <p className="hero-description">
              Una tarde con diez speakers de Rolling Code School para ordenar tu
              primera etapa, qué aprender, cómo practicar y cómo mostrar lo que
              sabés.
            </p>
            <div className="hero-actions">
              <a className="rc-button rc-button--black" href="#entradas">
                Comprar entrada
              </a>
              <a className="rc-button rc-button--outline" href="#agenda">
                Ver agenda
              </a>
            </div>
          </div>
          <aside className="event-facts" aria-label="Información del evento">
            {facts.map((fact) => (
              <div className="event-fact" key={fact.title}>
                <img src={fact.icon} alt="" />
                <p>
                  <strong>{fact.title}</strong>
                  <span className={fact.date ? 'event-fact__time' : ''}>
                    {fact.detail}
                  </span>
                </p>
              </div>
            ))}
            <div className="event-modes">
              <span>Presencial</span>
              <span>Virtual</span>
              <span>Cupos limitados</span>
            </div>
          </aside>
        </div>
      </section>
      <dl className="event-stats landing-container">
        {[
          ['120', 'lugares presenciales'],
          ['10', 'charlas de speakers'],
          ['3 h 40', 'de 18.00 a 21.40 hs'],
          ['2', 'modalidades: presencial y virtual'],
        ].map(([value, label]) => (
          <div key={value}>
            <dt>{value}</dt>
            <dd>{label}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
