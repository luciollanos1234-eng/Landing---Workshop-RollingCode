import { useEffect, useRef, useState } from 'react';
import './ScrollRobot.css';

export default function ScrollRobot() {
  const [dismissed, setDismissed] = useState(false);
  const robot = useRef(null);
  const interacting = useRef(false);
  const currentPosition = useRef(null);
  const manualPosition = useRef(null);
  const drag = useRef(null);
  const dragged = useRef(false);
  const dragTimer = useRef(null);

  function startDrag(event) {
    if (event.button !== 0) return;
    const bounds = robot.current.getBoundingClientRect();
    dragged.current = false;
    interacting.current = true;
    robot.current.dataset.greeting = 'false';
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      left: bounds.left,
      top: bounds.top + window.scrollY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(event) {
    const start = drag.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!dragged.current && Math.hypot(dx, dy) < 6) return;
    dragged.current = true;
    const x = Math.max(
      0,
      Math.min(document.documentElement.clientWidth - 76, start.left + dx),
    );
    const y = Math.max(
      window.scrollY,
      Math.min(window.scrollY + window.innerHeight - 128, start.top + dy),
    );
    currentPosition.current = { x, y };
    manualPosition.current = { x, offsetY: y - window.scrollY };
    robot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
    robot.current.dataset.bubbleSide = x < 230 ? 'right' : 'left';
    robot.current.dataset.dragging = 'true';
    robot.current.dataset.walking = 'true';
    clearTimeout(dragTimer.current);
    dragTimer.current = setTimeout(() => {
      if (robot.current) robot.current.dataset.walking = 'false';
    }, 160);
  }

  function finishDrag(event) {
    if (!drag.current || drag.current.id !== event.pointerId) return;
    drag.current = null;
    interacting.current = false;
    clearTimeout(dragTimer.current);
    robot.current.dataset.dragging = 'false';
    robot.current.dataset.walking = 'false';
  }

  useEffect(() => {
    if (dismissed) return;
    const element = robot.current;
    const desktop = window.matchMedia('(min-width: 1024px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let stopTimer;
    let greetingTimer;
    let anchors = [];
    let target = null;

    function measure() {
      anchors = [
        ...document.querySelectorAll(
          '.hero-panel, .speaker-card, .agenda-list, .ticket-card, .sponsor-card, .sponsor-form, .location-map',
        ),
      ]
        .map((card) => {
          const bounds = card.getBoundingClientRect();
          return { top: bounds.top + window.scrollY, right: bounds.right };
        })
        .sort((a, b) => a.top - b.top || b.right - a.right)
        .filter(
          (anchor, index, array) =>
            !index || Math.abs(anchor.top - array[index - 1].top) > 12,
        );
      update();
    }

    function draw() {
      frame = 0;
      if (interacting.current) return;
      if (!target) return;
      if (!currentPosition.current || reducedMotion.matches)
        currentPosition.current = { ...target };
      const position = currentPosition.current;
      position.x += (target.x - position.x) * 0.12;
      position.y += (target.y - position.y) * 0.12;
      element.style.transform = `translate3d(${position.x}px,${position.y}px,0)`;
      element.dataset.bubbleSide = position.x < 230 ? 'right' : 'left';
      if (
        Math.abs(target.x - position.x) + Math.abs(target.y - position.y) >
        0.5
      )
        frame = requestAnimationFrame(draw);
    }

    function update() {
      if (!desktop.matches) return;
      if (manualPosition.current) {
        target = {
          x: Math.max(
            0,
            Math.min(
              document.documentElement.clientWidth - 76,
              manualPosition.current.x,
            ),
          ),
          y: Math.min(
            document.documentElement.scrollHeight - 140,
            window.scrollY +
              Math.max(
                0,
                Math.min(
                  window.innerHeight - 128,
                  manualPosition.current.offsetY,
                ),
              ),
          ),
        };
        if (!frame) frame = requestAnimationFrame(draw);
        return;
      }
      const pageY = window.scrollY + window.innerHeight * 0.64;
      const next = anchors.findIndex((anchor) => anchor.top > pageY);
      const before =
        anchors[next === -1 ? anchors.length - 1 : Math.max(0, next - 1)];
      const after = anchors[next] || before;
      if (!before) return;
      const progress =
        after.top === before.top
          ? 0
          : Math.max(
              0,
              Math.min(1, (pageY - before.top) / (after.top - before.top)),
            );
      const edge = before.right + (after.right - before.right) * progress;
      target = {
        x: Math.min(
          document.documentElement.clientWidth - 76,
          Math.max(12, edge + 5),
        ),
        y: Math.min(document.documentElement.scrollHeight - 140, pageY),
      };
      if (!frame) frame = requestAnimationFrame(draw);
    }

    function scroll() {
      if (!desktop.matches) return;
      element.dataset.walking = reducedMotion.matches ? 'false' : 'true';
      clearTimeout(stopTimer);
      clearTimeout(dragTimer.current);
      stopTimer = setTimeout(() => {
        element.dataset.walking = 'false';
      }, 180);
      update();
    }

    const resize = new ResizeObserver(measure);
    resize.observe(document.querySelector('.site-page'));
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', measure);
    reducedMotion.addEventListener('change', measure);
    function showGreeting() {
      if (
        !desktop.matches ||
        document.hidden ||
        drag.current ||
        document.querySelector('dialog[open]')
      )
        return;
      element.dataset.bubbleSide =
        element.getBoundingClientRect().left < 230 ? 'right' : 'left';
      element.dataset.greeting = 'true';
      clearTimeout(greetingTimer);
      greetingTimer = setTimeout(() => {
        element.dataset.greeting = 'false';
      }, 6000);
    }
    const firstGreeting = setTimeout(showGreeting, 2000);
    const greetingInterval = setInterval(showGreeting, 15000);
    document.addEventListener('visibilitychange', showGreeting);
    desktop.addEventListener('change', showGreeting);
    measure();
    return () => {
      resize.disconnect();
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', measure);
      reducedMotion.removeEventListener('change', measure);
      cancelAnimationFrame(frame);
      clearTimeout(stopTimer);
      clearTimeout(dragTimer.current);
      clearInterval(greetingInterval);
      clearTimeout(firstGreeting);
      clearTimeout(greetingTimer);
      document.removeEventListener('visibilitychange', showGreeting);
      desktop.removeEventListener('change', showGreeting);
    };
  }, [dismissed]);

  if (dismissed) return null;
  return (
    <aside
      ref={robot}
      className="scroll-robot"
      aria-label="Mascota del workshop"
    >
      <div className="scroll-robot__bubble" aria-hidden="true">
        <strong>¡Conocé más sobre Rolling Code!</strong>
        <span>Hacé clic en mí.</span>
      </div>
      <button
        type="button"
        className="scroll-robot__close"
        aria-label="Ocultar mascota"
        onPointerEnter={() => {
          interacting.current = true;
        }}
        onPointerLeave={() => {
          interacting.current = false;
        }}
        onFocus={() => {
          interacting.current = true;
        }}
        onBlur={() => {
          interacting.current = false;
        }}
        onClick={() => setDismissed(true)}
      >
        ×
      </button>
      <a
        href="https://rollingcodeschool.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="scroll-robot__link"
        aria-label="Visitar Rolling Code School"
        title="Clic para visitar Rolling Code · Arrastrá para mover"
        draggable={false}
        onDragStart={(event) => event.preventDefault()}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={finishDrag}
        onPointerCancel={(event) => {
          dragged.current = true;
          finishDrag(event);
        }}
        onLostPointerCapture={finishDrag}
        onPointerEnter={() => {
          interacting.current = true;
        }}
        onPointerLeave={() => {
          if (!drag.current) interacting.current = false;
        }}
        onClick={(event) => {
          if (dragged.current && event.detail !== 0) event.preventDefault();
        }}
      >
        <svg
          className="scroll-robot__figure"
          viewBox="0 0 76 116"
          fill="none"
          aria-hidden="true"
        >
          <ellipse cx="38" cy="110" rx="23" ry="4" fill="black" opacity=".3" />
          <g className="scroll-robot__leg scroll-robot__leg--left">
            <path
              d="M29 82v17l-5 7"
              stroke="#a1a1aa"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M19 107h10"
              stroke="#ededf0"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
          <g className="scroll-robot__leg scroll-robot__leg--right">
            <path
              d="M46 82v17l5 7"
              stroke="#74747f"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M46 107h10"
              stroke="#d4d4d8"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
          <g className="scroll-robot__body">
            <path
              className="scroll-robot__arm scroll-robot__arm--left"
              d="m24 65-9 11 2 10"
              stroke="#a1a1aa"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              className="scroll-robot__arm scroll-robot__arm--right"
              d="m52 65 9 11-2 10"
              stroke="#a1a1aa"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <rect
              x="24"
              y="57"
              width="28"
              height="30"
              rx="9"
              fill="#a50d14"
              stroke="#f04b5a"
            />
            <path
              d="M32 68h12M34 74h8"
              stroke="#ffb0b8"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="38"
              cy="31"
              r="26"
              fill="#0b0b0c"
              stroke="#f5f5f5"
              strokeWidth="4"
            />
            <path
              d="m32 21-16 8v7l16 8v-9l-8-3 8-3zm12 0 16 8v7l-16 8v-9 0l8-3-8-3z"
              fill="#f5f5f5"
            />
          </g>
        </svg>
      </a>
    </aside>
  );
}
