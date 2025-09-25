import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useGuest } from "../../Context/GuestContext";

import logo from "../../assets/img/logo.png";

const InvitacionesNavbar = ({ count, setShowNavbar, showNavbar }) => {
  // const [showNavbar, setShowNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const { reservationDone } = useGuest();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        // subiendo
        setShowNavbar(true);
      } else {
        // bajando
        setShowNavbar(false);
      }

      setLastScrollY(window.scrollY);
      if (expanded) {
        setExpanded(false);
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, expanded]);
  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={(nextExpand) => setExpanded(nextExpand)}
      className={`transition-navbar ${
        expanded ? "navbar-expanded" : "navbar-transparent"
      } ${showNavbar ? "navbar-visible" : "navbar-hidden"} 4`}
      variant="dark"
    >
      <Container>
        <Navbar.Brand
          href="#inicio"
          className="text-white text-shadow fw-bold font-paris d-flex display-5"
        >
          Mariana & Erasto
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#inicio" className="text-white display-5">
              Inicio
            </Nav.Link>
            <Nav.Link href="#fecha" className="text-white display-5">
              Fecha
            </Nav.Link>
            <Nav.Link href="#itinerario" className="text-white display-5">
              Itinerario
            </Nav.Link>
            <Nav.Link href="#ubicacion" className="text-white display-5">
              Ubicacion
            </Nav.Link>
            <Nav.Link href="#mesa" className="text-white display-5">
              Mesa de regalos
            </Nav.Link>
            <Nav.Link href="#confirmar" className="text-white display-5">
              {reservationDone
                ? "Ver mis pases"
                : count === ""
                ? ""
                : "Confirmar Asistencia"}{" "}
            </Nav.Link>
            <Nav.Link href="#vestimenta" className="text-white display-5">
              Código de vestimenta
            </Nav.Link>
            <Nav.Link href="#hoteles" className="text-white display-5">
              Recomendación Hospedaje
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default InvitacionesNavbar;
