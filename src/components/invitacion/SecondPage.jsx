import React from "react";
import decoration from "../../assets/img/Untitled design (3).png";
import lineaAlReves from "../../assets/img/lineaalreves.png";

const SecondPage = ({ timeLeft }) => {
  return (
    <>
      <section className="second-section">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="col-10">
            <div data-aos="fade-down" data-aos-duration="2000">
              <div className="pb-4 d-flex justify-content-center align-items-center">
                <img
                  loading="lazy"
                  src={decoration}
                  alt="linae"
                  className="decoration"
                />
              </div>
              <p className="text-center display-6">
                El día más importante de nuestras vidas ha llegado
              </p>
              <div className="pt-2 d-flex justify-content-center align-items-center">
                <img
                  loading="lazy"
                  src={lineaAlReves}
                  alt="linea"
                  className="decoration"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container2">
          <div className="positon-relative">
            <div className="d-flex justify-content-center align-items-center">
              <div data-aos="zoom-in" data-aos-duration="3000">
                <p className="text-white cuenta-regresiva m-0 text-center">
                  Viernes
                </p>
                <p className="text-white text-center font-paris display-4">
                  22 <span>de</span> Noviembre <span>de</span> 2024
                </p>
              </div>
            </div>
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="1000"
            >
              <p className="text-white display-5 font-paris">Faltan</p>
              <div id="demo" className="cuenta-regresiva m-0">
                {timeLeft.expired ? (
                  <p>EXPIRED</p>
                ) : (
                  <p>
                    {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
                    {timeLeft.seconds}s
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="container3">
          <div className="d-flex justify-content-center align-items-center">
            <div className="pt-4">
              <p
                className="title2 pt-4 mb-0 text-center font-paris"
                data-aos="flip-up"
                data-aos-duration="2000"
              >
                Nuestra Boda
              </p>
              <div className="pb-2 d-flex justify-content-center align-items-center">
                <img
                  loading="lazy"
                  src={lineaAlReves}
                  alt="linea"
                  className="decoration"
                />
              </div>
              <div className="text-center p-4">
                <p
                  className="pr-4 pl-4"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  Hay momentos en la vida que son especiales por si solos, pero
                  compartirlos con las personas que quieres los convierte en
                  momentos inolvidables.
                </p>
                <p
                  className="pr-4 pl-4"
                  data-aos="fade-up"
                  data-aos-duration="2500"
                >
                  Tu presencia ha sido una parte valiosa de nuestra historia de
                  amor, y no podríamos comenzar este nuevo capítulo sin ti.
                </p>
                <p
                  className="pr-4 pl-4"
                  data-aos="fade-up"
                  data-aos-duration="3000"
                >
                  Nos encantaría que nos acompañaras y nos llenaras de alegría
                  en nuestro día tan especial.
                </p>
                <div className="d-flex justify-content-center">
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SecondPage;
