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
      <div className="location-map location-map--embedded">
        <iframe className="location-map__embed" title="Mapa de Rolling Code School, General Paz 576, San Miguel de Tucumán" src="https://www.google.com/maps?q=General%20Paz%20576%2C%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Argentina&z=17&output=embed" width="600" height="360" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        <div className="location-map__destination">
          <div className="location-map__address"><span className="location-map__badge" aria-hidden="true"><img src={location} alt="" /></span><div><small>Nos encontramos acá</small><strong>Gral. Paz 576</strong><p>Rolling Code School · Entrepiso</p></div></div>
          <a className="location-map__directions" href={mapsUrl} target="_blank" rel="noopener noreferrer">Cómo llegar <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
};

export default ComoLlegar;
