import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useGuest } from "../../Context/GuestContext";

const HotelSection = () => {
  const { eventData } = useGuest();
  const carouselRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("auto");

  useEffect(() => {
    if (carouselRef.current) {
      // Obtén todos los elementos dentro del carrusel
      const items = carouselRef.current.querySelectorAll(".carousel-item");
      let tallest = 0;

      items.forEach((item) => {
        const height = item.offsetHeight;
        if (height > tallest) tallest = height;
      });

      // Suma 3rem a la altura máxima (3rem = 48px aprox)
      setMaxHeight(`${tallest + 48}px`);
    }
  }, [eventData]); // Se vuelve a calcular cuando cambian los hoteles

  return (
    <section id="hoteles" className="p-4 bg-white">
      <div className="w-100">
        <p
          className="text-center mt-4 title2 font-paris font-gold"
          data-aos="fade-down"
          data-aos-duration="2000"
        >
          Recomendación de hospedaje
        </p>
      </div>

      <div
        ref={carouselRef}
        style={{ height: maxHeight, transition: "height 0.3s ease" }}
        className="d-flex justify-content-center align-items-center overflow-hidden"
      >
        <Carousel variant="dark" className="w-100">
          {eventData.hotels.map((hotel, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex p-3 justify-content-center align-items-center">
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <h2
                    data-aos="zoom-in-up"
                    data-aos-easing="linear"
                    data-aos-duration="1500"
                    className="f-w-70 pr-4 pl-4 mb-4 display-5 title2 text-center font-pari"
                  >
                    {hotel.name}
                  </h2>
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      data-aos="fade-down"
                      data-aos-easing="linear"
                      data-aos-duration="1500"
                      className="img-ubicaciones"
                      src={hotel.img}
                      alt={`imagen de ${hotel.name}`}
                    />
                  </div>
                  {/* <p
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="1500"
                    className="mt-2 font-paris display-5 pl-2 pr-2 text-center"
                  >
                    <i className="bi bi-car-front-fill"></i> {hotel.time}
                  </p> */}
                  <p
                    data-aos="zoom-in-up"
                    data-aos-easing="linear"
                    data-aos-duration="1500"
                    className="text-infor font-aleo text-center my-4 mr-4 ml-4"
                  >
                    {hotel.address}
                  </p>
                  <div className="d-flex align-items-center pb-4 justify-content-center">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white"
                      href={hotel.link}
                    >
                      <button className="animate__pulse animate__animated animate__infinite btn btn-ver-mapa display-6 py-3 d-flex align-items-center">
                        <i className="bi bi-geo-alt font-gold"></i>
                        <span className="d-flex display-5 font-paris font-gold align-items-center justify-content-center p-0 m-0">
                          Ver más detalles
                        </span>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default HotelSection;
