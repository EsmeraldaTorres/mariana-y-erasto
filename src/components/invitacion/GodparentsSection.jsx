import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useGuest } from "../../Context/GuestContext";

const GodparentsSection = () => {
  const { eventData } = useGuest();
  const carouselRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("auto");

  useEffect(() => {
    if (carouselRef.current) {
      // Buscar todos los elementos .carousel-item dentro del contenedor
      const items = carouselRef.current.querySelectorAll(".carousel-item");
      let tallest = 0;

      items.forEach((item) => {
        const height = item.offsetHeight;
        if (height > tallest) tallest = height;
      });

      setMaxHeight(`${tallest + 48}px`); // sin los 3rem extra
    }
  }, [eventData]);

  return (
    <section className="p-4 nuestros-padrinos">
      <div className="w-100">
        <p
          className="text-center mt-4 title2 font-paris"
          data-aos="fade-down"
          data-aos-duration="2000"
        >
          Nuestros Testigos
        </p>
      </div>

      {/* Contenedor que ajusta la altura */}
      <div
        ref={carouselRef}
        style={{ height: maxHeight, transition: "height 0.3s ease" }}
        className="d-flex justify-content-center align-items-center overflow-hidden"
      >
        <Carousel variant="dark" className="w-100">
          {eventData.padrinos.map(({ icon, title, names }, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex p-3 justify-content-center align-items-center">
                <div className="text-center">
                  <img
                    loading="lazy"
                    className="icon-img mb-2"
                    src={icon}
                    alt={`Ícono de ${title}`}
                  />
                  <p className="card-text">{title}</p>
                  {index === 0
                    ? names.map((name, i) =>
                        i === 0 ? (
                          <React.Fragment key={i}>
                            <p className="card-text display-6">
                              {name} <span className="text-white">ho</span>
                            </p>
                          </React.Fragment>
                        ) : (
                          <p className="card-text display-6" key={i}>
                            {name}
                          </p>
                        )
                      )
                    : names.map((name, i) => (
                        <p className="card-text display-6" key={i}>
                          {name}
                        </p>
                      ))}
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default GodparentsSection;
