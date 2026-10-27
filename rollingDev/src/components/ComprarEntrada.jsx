import { useEffect, useState } from 'react'
import Checkout from './Checkout'
import FlipNumber from './FlipNumber'

const ticketOptions = [
  { id: 'early', name: 'Early Bird', price: 25000, note: 'Presencial · Hasta el 5/11' },
  { id: 'general', name: 'General', price: 35000, note: 'Presencial · Desde el 6/11' },
  { id: 'virtual', name: 'Virtual', price: 15000, note: 'Transmisión en vivo y grabación' },
]

const ticketBenefits = {
  early: [
    'Acceso a las 10 charlas',
    'Kit de bienvenida Rolling Code',
    'Certificado de asistencia',
    'Coffee break y networking con los speakers',
    'Grabación de todas las charlas',
  ],
  general: [
    'Acceso a las 10 charlas',
    'Certificado de asistencia',
    'Coffee break y networking con los speakers',
    'Grabación de todas las charlas',
  ],
  virtual: [
    'Transmisión en vivo de las 10 charlas',
    'Chat para hacer preguntas a los speakers',
    'Certificado de asistencia',
    'Grabación disponible por 30 días',
  ],
}

const earlyBirdDeadline = new Date('2026-11-06T00:00:00-03:00').getTime()
const formatPrice = (amount) => `$${amount.toLocaleString('es-AR')}`

function getTimeLeft() {
  const difference = Math.max(0, earlyBirdDeadline - Date.now())
  const totalMinutes = Math.floor(difference / 60000)

  return {
    days: Math.floor(totalMinutes / 1440),
    hours: Math.floor((totalMinutes % 1440) / 60),
    minutes: totalMinutes % 60,
    seconds: Math.floor(difference / 1000) % 60,
  }
}

function ComprarEntrada() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)
  const [selectedTicket, setSelectedTicket] = useState('early')
  const [quantity, setQuantity] = useState(1)
  const [checkoutSession, setCheckoutSession] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  const chooseTicket = (ticketId) => {
    setSelectedTicket(ticketId)
    setQuantity(1)
    setCheckoutSession(current => current + 1)
    document.getElementById('checkout')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  return (
    <section id="entradas" className="tickets-section">
      <div className="tickets-container">
        <header className="tickets-heading">
          <p className="tickets-eyebrow">Entradas</p>
          <h2 className="tickets-title">Asegurá tu lugar antes de que suba el precio</h2>

        </header>

        <aside className="early-bird-banner" aria-label="Promoción Early Bird">
          <div className="early-bird-copy">
            <p className="tickets-eyebrow">Early Bird</p>
            <h3>El precio especial termina el 5/11</h3>
            <p>Comprá antes de que la entrada presencial pase de $25.000 a $35.000.</p>
          </div>
          <div className="countdown" role="timer" aria-live="off" aria-label={`Quedan ${timeLeft.days} días, ${timeLeft.hours} horas, ${timeLeft.minutes} minutos y ${timeLeft.seconds} segundos`}>
            {[
              { label: 'días', value: timeLeft.days },
              { label: 'horas', value: timeLeft.hours },
              { label: 'min', value: timeLeft.minutes },
              { label: 'seg', value: timeLeft.seconds },
            ].map(({ label, value }) => (
              <div key={label} className="countdown-unit">
                <FlipNumber value={value} />
                <small>{label}</small>
              </div>
            ))}
          </div>
          <div className="ticket-availability">
            <div className="ticket-availability__labels">
              <span>Disponibilidad ilustrativa</span>
              <span>63 % · muestra</span>
            </div>
            <div
              className="ticket-availability__track"
              role="progressbar"
              aria-label="Disponibilidad de muestra del mockup"
              aria-valuenow="63"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <span />
            </div>
          </div>
        </aside>

        <div className="ticket-cards">
          {ticketOptions.map((ticket) => (
            <article
              key={ticket.id}
              className={`ticket-card${ticket.id === 'early' ? ' ticket-card--featured' : ''}`}
            >
              <div className="ticket-card__topline">
                <h3>{ticket.name}</h3>
                <span>{ticket.id === 'early' ? 'Quedan 38' : ticket.id === 'general' ? 'Desde el 6/11' : 'Disponible siempre'}</span>
              </div>
              <p className="ticket-card__price">
                {formatPrice(ticket.price)}
                {ticket.id === 'early' && <del>{formatPrice(35000)}</del>}
              </p>
              <p className="ticket-card__note">{ticket.note}</p>
              <ul className="ticket-benefits">
                {ticketBenefits[ticket.id].map((benefit) => (
                  <li key={benefit}><span aria-hidden="true">✓</span>{benefit}</li>
                ))}
              </ul>
              <div className="ticket-card__stub" aria-hidden="true">
                <span>Rolling Code · 19 NOV</span>
                <span className="ticket-card__barcode" />
              </div>
              <button
                type="button"
                className={ticket.id === 'early' ? 'ticket-button ticket-button--light' : 'ticket-button'}
                onClick={() => chooseTicket(ticket.id)}
              >
                Elegir entrada
              </button>
            </article>
          ))}
        </div>

        <Checkout key={checkoutSession} ticketOptions={ticketOptions} selectedTicket={selectedTicket} onSelect={setSelectedTicket} quantity={quantity} onQuantity={setQuantity} />
      </div>
    </section>
  )
}

export default ComprarEntrada
