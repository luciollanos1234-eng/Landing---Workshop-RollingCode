import { useEffect, useRef, useState } from 'react';
import logo from '../assets/logo-rolling-blanco.png';
import './Chatbot.css';

const quickQuestions = ['Entradas y precios', 'Agenda', 'Ubicación'];

const normalize = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

function getAnswer(question) {
  const text = normalize(question);

  if (/entrada|precio|cuesta|valor|compr|ticket/.test(text)) {
    return {
      text: 'Hay entradas presenciales Early Bird a $25.000 hasta el 30/10, General a $35.000 desde el 31/10 y Virtual a $15.000. El checkout del sitio es una demostración y no procesa pagos.',
      href: '#entradas',
      link: 'Ver entradas',
    };
  }

  if (/agenda|horario|charla|speaker|disertante/.test(text)) {
    return {
      text: 'El workshop es el jueves 19/11, de 18:00 a 21:40, con diez charlas y un espacio final para preguntas y networking.',
      href: '#agenda',
      link: 'Ver agenda',
    };
  }

  if (/ubicacion|direccion|lugar|llegar|mapa|donde/.test(text)) {
    return {
      text: 'El evento se realiza en Rolling Code School, Gral. Paz 576, Entrepiso, San Miguel de Tucumán.',
      href: '#como-llegar',
      link: 'Ver ubicación',
    };
  }

  if (/virtual|modalidad|presencial/.test(text)) {
    return {
      text: 'Hay modalidad presencial en Rolling Code School y modalidad virtual con transmisión en vivo y grabación.',
      href: '#entradas',
      link: 'Ver modalidades',
    };
  }

  if (/sponsor|patrocin|empresa/.test(text)) {
    return {
      text: 'Encontrás los sponsors y el formulario para postular una empresa en esta sección.',
      href: '#sponsors',
      link: 'Ver sponsors',
    };
  }

  if (/hola|buenas|buenos dias|buenas tardes/.test(text)) {
    return {
      text: '¡Hola! Puedo ayudarte con entradas, agenda, modalidades y ubicación del workshop.',
    };
  }

  return {
    text: 'Puedo ayudarte con información sobre entradas y precios, agenda, modalidades o ubicación. ¿Qué te gustaría saber?',
  };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 0,
      sender: 'bot',
      text: '¡Hola! Soy el asistente del workshop. ¿En qué puedo ayudarte?',
    },
  ]);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      messagesEndRef.current?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, messages]);

  useEffect(() => {
    if (!isOpen) return undefined;
    function closeOnEscape(event) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  function sendMessage(text = message) {
    const question = text.trim();
    if (!question) return;

    const answer = getAnswer(question);
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), sender: 'user', text: question },
      { id: crypto.randomUUID(), sender: 'bot', ...answer },
    ]);
    setMessage('');
  }

  return (
    <aside className="chatbot" aria-label="Asistente del workshop">
      {isOpen && (
        <section
          className="chatbot__panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="chatbot-title"
        >
          <header className="chatbot__header">
            <img
              className="chatbot__logo"
              src={logo}
              alt="Rolling Code School"
            />
            <div className="chatbot__heading">
              <h2 id="chatbot-title">Asistente Rolling Code</h2>
              <p>Información del workshop</p>
            </div>
            <button
              type="button"
              className="chatbot__close"
              aria-label="Cerrar chat"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </header>

          <div className="chatbot__messages" role="log" aria-live="polite">
            {messages.map((item) => (
              <div
                className={`chatbot__message chatbot__message--${item.sender}`}
                key={item.id}
              >
                <p>{item.text}</p>
                {item.link && (
                  <a href={item.href} onClick={() => setIsOpen(false)}>
                    {item.link}
                  </a>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div
              className="chatbot__suggestions"
              aria-label="Preguntas frecuentes"
            >
              {quickQuestions.map((question) => (
                <button
                  type="button"
                  key={question}
                  onClick={() => sendMessage(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          <form
            className="chatbot__form"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <label className="sr-only" htmlFor="chatbot-message">
              Escribí tu pregunta
            </label>
            <input
              id="chatbot-message"
              ref={inputRef}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Escribí tu pregunta..."
              maxLength={500}
            />
            <button type="submit" disabled={!message.trim()}>
              Enviar
            </button>
          </form>
          <p className="chatbot__notice">
            Asistente automático. No procesa pagos ni envía tus mensajes.
          </p>
        </section>
      )}

      <button
        type="button"
        className="chatbot__toggle"
        aria-label={isOpen ? 'Cerrar asistente' : 'Abrir asistente'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? (
          <span aria-hidden="true">×</span>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
          </svg>
        )}
      </button>
    </aside>
  );
}
