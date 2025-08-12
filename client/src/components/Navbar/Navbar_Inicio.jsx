import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navbar_Inicio() {
  return (
    <Navbar className="navbar" bg="primary" data-bs-theme="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#home">Pruebas Junior</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Identificación</Nav.Link>
            <Nav.Link href="#pricing">Busqueda de planta</Nav.Link>
            <Nav.Link href="#pricing">Pantalla de Familias</Nav.Link>
            <Nav.Link href="#pricing">Chatbot</Nav.Link>
            <Nav.Link href="#pricing">Historial de chats</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar_Inicio;
