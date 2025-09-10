import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // 👉 aquí defines en qué rutas NO quieres overflow hidden
    const rutasSinOverflow = [
      "/pases-boda/:id/:user/:code",
      "/data-page",
      "/invite-form/access:digital-invite-by-esmeralda-01",
    ];

    if (rutasSinOverflow.includes(location.pathname)) {
      html.style.overflow = "auto";
      body.style.overflow = "auto";
    } else {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    }

    // limpiar al desmontar
    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [location]);

  return null; // este componente no pinta nada
}

export default ScrollManager;
