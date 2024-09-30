import React from "react";
import Carousel from "react-bootstrap/Carousel";
import hotelGamaImg from "../../assets/img/gamma-xalapa-hotel.png";
import hotelInnImg from "../../assets/img/holiday-inn-hotel.png";
import granHotelImg from "../../assets/img/gran-hotel-xalpa-hotel.png";

const HotelSection = () => {
  return (
    <section className="p-4 bg-white">
      <div className="w-100">
        <p
          className="text-center mt-4 title2 font-paris font-gold"
          data-aos="fade-down"
          data-aos-duration="2000"
        >
          Recomendación de hospedaje
        </p>
      </div>
      <Carousel variant="dark" className="d-flex justify-content-center">
        <Carousel.Item>
          <div className="d-flex p-3 justify-content-center align-items-center">
            <div>
              <div className="d-flex justify-content-center align-items-center flex-column">
                <h2
                  data-aos="zoom-in-up"
                  data-aos-easing="linear"
                  data-aos-duration="1500"
                  className="f-w-700 txt-pink-dark pr-4 pl-4 mb-4 display-5 title2 text-center font-paris"
                >
                  Gran Hotel Xalapa
                </h2>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="1500"
                    className="img-ubicaciones"
                    src={granHotelImg}
                    alt="iglesia"
                  />
                </div>

                <p
                  data-aos="fade-down"
                  data-aos-easing="linear"
                  data-aos-duration="1500"
                  className="txt-pink-dark mt-2 font-paris display-5 pl-2 pr-2 text-center
                    "
                >
                  {" "}
                  <i className="bi bi-car-front-fill "></i> A 40 min de la
                  fiesta
                </p>
                <p
                  data-aos="zoom-in-up"
                  data-aos-easing="linear"
                  data-aos-duration="1500"
                  className="text-infor font-aleo  text-center mr-4 ml-4"
                >
                  Guadalupe Victoria 163, Zona Centro, Centro, 91000
                  Xalapa-Enríquez, Ver.{" "}
                </p>

                <div className="d-flex align-items-center py-4 justify-content-center">
                  <a
                    target="_blank"
                    className="text-white"
                    href="https://maps.app.goo.gl/3yXfaZVray72iGWv5"
                  >
                    <button className="animate__pulse animate__animated animate__infinite btn btn-ver-mapa display-6 py-3 d-flex align-items-center">
                      <i className="bi bi-geo-alt font-gold"></i>
                      <span className="d-flex display-5  font-paris font-gold align-items-center justify-content-center p-0 m-0">
                        Ver más detalles
                      </span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex p-3 justify-content-center align-items-center">
            <div>
              <div className="d-flex justify-content-center align-items-center flex-column">
                <h2
                  data-aos="zoom-in-up"
                  data-aos-easing="linear"
                  data-aos-duration="1500"
                  className="f-w-700 txt-pink-dark pr-4 pl-4 mb-4 display-5 title2 text-center font-paris"
                >
                  Holiday Inn Express Xalapa
                </h2>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="1500"
                    className="img-ubicaciones"
                    src={hotelInnImg}
                    alt="iglesia"
                  />
                </div>

                <p
                  data-aos="fade-down"
                  data-aos-easing="linear"
                  data-aos-duration="1500"
                  className="txt-pink-dark mt-2 font-paris display-5 pl-2 pr-2 text-center
                    "
                >
                  {" "}
                  <i className="bi bi-car-front-fill "></i> A 40 min de la
                  fiesta
                </p>
                <p
                  data-aos="zoom-in-up"
                  data-aos-easing="linear"
                  data-aos-duration="1500"
                  className="text-infor font-aleo  text-center mr-4 ml-4"
                >
                  Ignacio Zaragoza 8, Zona Centro, Centro, 91000
                  Xalapa-Enríquez, Ver.
                </p>

                <div className="d-flex align-items-center py-4 justify-content-center">
                  <a
                    target="_blank"
                    className="text-white"
                    href="https://maps.app.goo.gl/wBtTrNBGZQTcYWhM9"
                  >
                    <button className="animate__pulse animate__animated animate__infinite btn btn-ver-mapa display-6 py-3 d-flex align-items-center">
                      <i className="bi bi-geo-alt font-gold"></i>
                      <span className="d-flex display-5  font-paris font-gold align-items-center justify-content-center p-0 m-0">
                        Ver más detalles
                      </span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex p-3 justify-content-center align-items-center">
            <div>
              <div className="d-flex justify-content-center align-items-center flex-column">
                <h2
                  data-aos="zoom-in-up"
                  data-aos-easing="linear"
                  data-aos-duration="1500"
                  className="f-w-700 txt-pink-dark pr-4 pl-4 mb-4 display-5 title2 text-center font-paris"
                >
                  Gamma Xalapa Nubara
                </h2>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="1500"
                    className="img-ubicaciones"
                    src={hotelGamaImg}
                    alt="iglesia"
                  />
                </div>

                <p
                  data-aos="fade-down"
                  data-aos-easing="linear"
                  data-aos-duration="1500"
                  className="txt-pink-dark font-paris display-5 mt-2 pl-2 pr-2 text-center
                    "
                >
                  {" "}
                  <i className="bi bi-car-front-fill "></i> A 32 min de la
                  fiesta
                </p>
                <p
                  data-aos="zoom-in-up"
                  data-aos-easing="linear"
                  data-aos-duration="1500"
                  className="text-infor font-aleo  text-center mr-4 ml-4"
                >
                  Av. Adolfo Ruiz Cortines 912 Col, U.H. del Bosque, 91017
                  Xalapa-Enríquez, Ver.{" "}
                </p>

                <div className="d-flex align-items-center py-4 justify-content-center">
                  <a
                    target="_blank"
                    className="text-white"
                    href="https://maps.app.goo.gl/weUd2wWCdZnn8dG78"
                  >
                    <button className="animate__pulse animate__animated animate__infinite btn btn-ver-mapa display-6 py-3 d-flex align-items-center">
                      <i className="bi bi-geo-alt font-gold"></i>
                      <span className="d-flex display-5  font-paris font-gold align-items-center justify-content-center p-0 m-0">
                        Ver más detalles
                      </span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default HotelSection;
