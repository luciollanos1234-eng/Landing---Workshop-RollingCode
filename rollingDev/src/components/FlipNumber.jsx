import { useState } from 'react'

export default function FlipNumber({ value }) {
  const [frame, setFrame] = useState({ value, previous: value })

  // Keep the outgoing value together with the new one for this transition.
  if (frame.value !== value) setFrame({ value, previous: frame.value })

  const current = String(value).padStart(2, '0')
  const previous = String(frame.previous).padStart(2, '0')
  const changed = frame.previous !== value

  return <div className="flip-number" aria-hidden="true">
    <span className="flip-number__value">{current}</span>
    {changed && <div key={value} className="flip-number__animation">
      <div className="flip-number__half flip-number__half--old-bottom"><span>{previous}</span></div>
      <div className="flip-number__half flip-number__half--top"><span>{previous}</span></div>
      <div className="flip-number__half flip-number__half--bottom"><span>{current}</span></div>
    </div>}
  </div>
}
