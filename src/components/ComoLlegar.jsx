import location from '../assets/ubicacion.svg';

const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=Rolling+Code+School+General+Paz+576+San+Miguel+de+Tucuman';

const ComoLlegar = () => {
  return (
    <section
      id="como-llegar"
      className="landing-container landing-section location-grid"
      aria-labelledby="location-title"
    >
      <div>
        <p className="section-eyebrow">Cómo llegar</p>
        <h2 id="location-title" className="section-title">
          Te esperamos en
          <br />
          Rolling Code
          <br />
          School
        </h2>
        <div className="flex items-start gap-3 my-6">
          <img src={location} alt="" className="w-6" />
          <address className="not-italic">
            <strong>Gral. Paz 576, Entrepiso</strong>
            <br />
            <span className="text-gris-claro">
              4000 San Miguel de Tucumán, Tucumán
            </span>
          </address>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="event-chip">Jueves 19/11</span>
          <span className="event-chip">18.00 hs</span>
          <span className="event-chip">Entrepiso</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-button rc-button--red"
          >
            Abrir en Google Maps
          </a>
          <a href="#entradas" className="rc-button rc-button--outline">
            Comprar entrada
          </a>
        </div>
      </div>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="location-map"
        aria-label="Ver la ubicación de Rolling Code School en Google Maps"
      >
        <div className="location-map__streets" aria-hidden="true">
          <span className="location-map__pin">●</span>
        </div>
        <div className="location-map__caption">
          <strong>Rolling Code School</strong>
          <span>Gral. Paz 576, San Miguel de Tucumán</span>
          <small>Abrir mapa ↗</small>
        </div>
      </a>
    </section>
  );
};

export default ComoLlegar;
