import React from "react";
import decoration from "../../assets/img/2.png";
import decoration2 from "../../assets/img/4.png";
import decoration3 from "../../assets/img/7.png";

import lineaAlReves from "../../assets/img/2.png";
import { useGuest } from "../../Context/GuestContext";
import useCountdown from "../hooks/useCountDown";

const SecondPage = ({}) => {
  const { eventData } = useGuest();
  const timeCountDown = useCountdown(eventData.countDown);

  return (
    <>
      <section className="second-section">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="col-10">
            <div data-aos="fade-down" data-aos-duration="2000">
              <div className="py-4 mt-4 d-flex justify-content-center align-items-center">
                <img
                  loading="lazy"
                  src={decoration}
                  alt="linae"
                  className="decoration rotate-180"
                />
              </div>
              <p className="text-center display-6">
                El día más importante de nuestras vidas ha llegado
              </p>
              <div className="py-4 mb-4 d-flex justify-content-center align-items-center">
                <img
                  loading="lazy"
                  src={lineaAlReves}
                  alt="linea"
                  className="decoration "
                />
              </div>
            </div>
          </div>
        </div>
        <div id="fecha" className="container2">
          <div className="positon-relative">
            <div className="d-flex justify-content-center align-items-center">
              <div data-aos="zoom-in" data-aos-duration="3000">
                <p className="text-white cuenta-regresiva m-0 text-center">
                  {eventData.weekendDay}
                </p>
                <p className="text-white px-3 text-center font-paris display-4">
                  {eventData.day}
                  <span> de</span> {eventData.month} <span>de</span>{" "}
                  {eventData.year}
                </p>
              </div>
            </div>
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="1000"
            >
              <p className="text-white display-5 font-pari mb-0 mt-4">Faltan</p>
              <div id="demo" className="cuenta-regresiva m-0">
                {timeCountDown.expired ? (
                  <p>- - -</p>
                ) : (
                  <p>
                    {timeCountDown.days}d {timeCountDown.hours}h{" "}
                    {timeCountDown.minutes}m {timeCountDown.seconds}s
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
                  src={decoration2}
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
                <div className="pb-2 d-flex justify-content-center align-items-center">
                  <img
                    loading="lazy"
                    src={decoration3}
                    alt="linea"
                    className="decoration"
                  />
                </div>
                <p
                  className="pr-4 pl-4"
                  data-aos="fade-up"
                  data-aos-duration="3000"
                >
                  Nos encantaría que nos acompañaras y nos llenaras de alegría
                  en nuestro día tan especial.
                </p>
                {/* <div className="d-flex justify-content-center">
                  <hr />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SecondPage;
