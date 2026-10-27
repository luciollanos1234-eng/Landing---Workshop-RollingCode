import Speakers from "./components/Speakers"
import Footer from "./components/Footer"
import Agenda from "./components/Agenda"


function App() {

  return (
    <div className="min-h-screen flex flex-col">
     <main className="grow">
     <Speakers/>
     <Agenda/>
     </main>
     <Footer/>
    </div>
  )
}

export default App
