import { useEffect, useState } from 'react'

export default function MobileTicketBar() {
  const [ticketsVisible, setTicketsVisible] = useState(true)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const tickets = document.getElementById('entradas')
    if (!tickets || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => {
      setTicketsVisible(entry.isIntersecting)
    })
    observer.observe(tickets)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const isField = element => Boolean(element?.matches('input, textarea, select, [contenteditable="true"]'))
    const focusIn = event => setEditing(isField(event.target))
    const focusOut = event => setEditing(isField(event.relatedTarget))
    document.addEventListener('focusin', focusIn)
    document.addEventListener('focusout', focusOut)
    return () => {
      document.removeEventListener('focusin', focusIn)
      document.removeEventListener('focusout', focusOut)
    }
  }, [])

  return <aside className="mobile-ticket-bar" aria-label="Acceso rápido a entradas" hidden={ticketsVisible || editing}>
    <p><small>Workshop Rolling Code</small><strong>Desde $15.000</strong></p>
    <a href="#entradas" className="rc-button rc-button--red">Ver entradas</a>
  </aside>
}
