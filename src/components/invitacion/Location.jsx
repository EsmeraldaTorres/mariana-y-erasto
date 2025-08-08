import React from "react";
import lineaAlReves from "../../assets/img/lineaalreves.png";
import salonUbicacion from "../../assets/img/salon-cristina.png";
import iglesiaUbicacion from "../../assets/img/iglesia.jpeg";
import { useGuest } from "../../Context/GuestContext";

const Location = () => {
  const { eventData } = useGuest;

  return (
    <section className="ubicacion pt-4">
      <div>
        <p
          className="text-center m-0 pt-4 display-5"
          data-aos="flip-up"
          data-aos-duration="2000"
        >
          Ubicaciones
        </p>
        <div className="d-flex justify-content-center align-items-center">
          <img className="line" src={lineaAlReves} alt="línea decorativa" />
        </div>
      </div>

      <div className="d-flex row m-0 justify-content-center align-items-center">
        {eventData.locations.map((loc, index) => (
          <div
            key={index}
            className="col-md-5 container-ubicaciones"
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay={loc.delay}
          >
            <div className="card-ubicaciones">
              <p className="text-center font-paris display-4">{loc.title}</p>
              <p className="text-center display-6">{loc.time}</p>

              <div className="d-flex justify-content-center align-items-center">
                <img
                  loading="lazy"
                  className="img-ubicaciones"
                  src={loc.image}
                  alt={loc.alt}
                />
              </div>

              <p className="text-center display-6 py-3">{loc.name}</p>
              <p className="text-center">{loc.address}</p>

              <div className="d-flex align-items-center py-4 justify-content-center">
                <a href={loc.mapLink} target="_blank" rel="noopener noreferrer">
                  <button className="btn display-6 py-3 d-flex align-items-center animate__animated animate__pulse animate__infinite">
                    <i className="bi bi-geo-alt text-dark"></i>
                    <span className="d-flex text-dark align-items-center justify-content-center p-0 m-0">
                      Ver mapa
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Location;
