import React from "react";
import Carousel from "react-bootstrap/Carousel";
import iconFiesta from "../../assets/img/fiesta.png";
import iconComida from "../../assets/img/comida.png";
import iconIglesia from "../../assets/img/iglesia.png";
import iconRecepcion from "../../assets/img/Recepcion (1).png";
const Itinerary = () => {
  return (
    <>
      <section className="itinerario">
        <p className="text-center display-4 font-paris text-white m-0 pt-4">
          Itinerario
        </p>
        <div className="App">
          <Carousel>
            <Carousel.Item>
              <div className="card d-flex justify-content-center align-items-center">
                <div className="w-100 d-flex justify-content-center w-100 flex-column align-items-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      loading="lazy"
                      className="card-img animate__animated animate__pulse animate__repeat-2 animate_slower"
                      src={iconIglesia}
                      alt="Card image cap"
                    />
                  </div>
                  <p className="card-text text-white text-center p-0 font-paris display-5">
                    Ceremonia religiosa
                  </p>
                  <p className="card-text text-shadow text-white font-weight-bold text-center display-5">
                    5:00pm
                  </p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="card d-flex justify-content-center align-items-center">
                <div className="w-100 d-flex justify-content-center w-100 flex-column align-items-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      loading="lazy"
                      className="card-img animate__animated animate__pulse animate__repeat-2 animate_slower"
                      src={iconRecepcion}
                      alt="Card image cap"
                    />
                  </div>
                  <p className="card-text text-white text-center p-0 font-paris display-5">
                    Recepción
                  </p>
                  <p className="card-text text-shadow text-white font-weight-bold text-center display-5">
                    6:00pm
                  </p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="card d-flex justify-content-center align-items-center">
                <div className="w-100 d-flex justify-content-center w-100 flex-column align-items-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      loading="lazy"
                      className="card-img animate__animated animate__pulse animate__repeat-2 animate_slower"
                      src={iconComida}
                      alt="Card image cap"
                    />
                  </div>
                  <p className="card-text text-white text-center p-0 font-paris display-5">
                    Fiesta
                  </p>
                  <p className="card-text text-shadow text-white font-weight-bold text-center display-5">
                    7:00pm
                  </p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="card d-flex justify-content-center align-items-center">
                <div className="w-100 d-flex justify-content-center w-100 flex-column align-items-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      loading="lazy"
                      className="card-img animate__animated animate__pulse animate__repeat-2 animate_slower"
                      src={iconFiesta}
                      alt="Card image cap"
                    />
                  </div>
                  <p className="card-text text-white text-center p-0 font-paris display-5">
                    Fiesta
                  </p>
                  <p className="card-text text-shadow text-white font-weight-bold text-center display-5">
                    9:00pm
                  </p>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default Itinerary;
