import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar_Inicio from './components/Navbar/Navbar_Inicio.jsx'
import Home from './components/Home.jsx'
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
          </Routes>
        </Router>
      </div>
  )
}

export default App
