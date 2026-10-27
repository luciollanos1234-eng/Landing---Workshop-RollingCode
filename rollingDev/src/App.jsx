import Navbar from './components/Navbar'
import Header from './components/Header'
import Speakers from './components/Speakers'
import Agenda from './components/Agenda'
import ComprarEntrada from './components/ComprarEntrada'
import ComoLlegar from './components/ComoLlegar'
import Sponsors from './components/Sponsors'
import SponsorForm from './components/SponsorForm'
import Footer from './components/Footer'
import MobileTicketBar from './components/MobileTicketBar'

export default function App() {
  return <div id="inicio" className="site-page">
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <Navbar />
    <main id="contenido">
      <Header />
      <Speakers />
      <Agenda />
      <ComprarEntrada />
      <ComoLlegar />
      <Sponsors />
      <SponsorForm />
    </main>
    <Footer />
    <MobileTicketBar />
  </div>
}
