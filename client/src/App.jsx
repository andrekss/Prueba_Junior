import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar_Inicio from './components/Navbar/Navbar_Inicio.jsx'
import Home from './components/Home.jsx'
import Chatbot from './components/chatbot.jsx'
import Historial from './components/Historial.jsx'
import './App.css'
import Identificación from './components/Identificación.jsx'


function App() {
  return (
      <div>
      <Navbar_Inicio/>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/identificacion" element={<Identificación/>} />
            <Route path="/chatbot" element={<Chatbot/>} />
            <Route path="/Historial" element={<Historial/>} />
          </Routes>
        </Router>
      </div>
  )
}

export default App
