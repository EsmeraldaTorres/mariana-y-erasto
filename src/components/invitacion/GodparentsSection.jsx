import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { useGuest } from "../../Context/GuestContext";

//

const GodparentsSection = () => {
  const { eventData } = useGuest();
  return (
    <section className="p-4 nuestros-padrinos">
      <div className="w-100">
        <p
          className="text-center mt-4 title2 font-paris"
          data-aos="fade-down"
          data-aos-duration="2000"
        >
          Nuestros padrinos
        </p>
      </div>

      <Carousel variant="dark">
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
                {names.map((name, i) => (
                  <p className="card-text display-6" key={i}>
                    {name}
                  </p>
                ))}
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default GodparentsSection;
