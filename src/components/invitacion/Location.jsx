import React from "react";
import lineaAlReves from "../../assets/img/lineaalreves.png";
import salonUbicacion from "../../assets/img/salon-cristina.png";
import iglesiaUbicacion from "../../assets/img/iglesia.jpeg";

const Location = () => {
  return (
    <>
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
            <img className="line" src={lineaAlReves} alt="linea" />
          </div>
        </div>
        <div className="d-flex row m-0 justify-content-center align-items-center">
          <div
            className="col-md-5 container-ubicaciones"
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="500"
          >
            <div className="card-ubicaciones">
              <p className="text-center font-paris display-4">Ceremonia</p>
              <p className="text-center display-6">19:00hrs</p>
              <div className="d-flex justify-content-center align-items-center">
                <img
                  loading="lazy"
                  className="img-ubicaciones"
                  src={iglesiaUbicacion}
                  alt="iglesia"
                />
              </div>
              <p className="text-center display-6 py-3">
                Parroquia "San Isidro Labrador"
              </p>
              <p className="text-center">
                Teresa Vera 102, Centro, 86300 Comalcalco, Tab.
              </p>
              <div className="d-flex align-items-center py-4 justify-content-center">
                <a href="https://www.google.com/maps?q=parroquia+san+isidro+labrador+comalcalco&rlz=1C5CHFA_enMX973MX974&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjNkcnum-j5AhXpC0QIHT8FAkYQ_AUoAXoECAIQAw">
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
          <div
            className="col-md-5 container-ubicaciones"
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="700"
          >
            <div className="card-ubicaciones">
              <p className="text-center font-paris display-4">Recepción</p>
              <p className="text-center display-6">20:00hrs</p>
              <div className="d-flex justify-content-center align-items-center">
                <img
                  className="img-ubicaciones"
                  src={salonUbicacion}
                  alt="salon"
                />
              </div>
              <p className="text-center display-6 py-3">
                Salón de Eventos "Cristina"
              </p>
              <p className="text-center">
                Recinto 102, Centro, 86300 Comalcalco, Tab.
              </p>
              <div className="d-flex align-items-center py-3 justify-content-center">
                <a href="https://www.google.com/maps/place/Sal%C3%B3n+Jard%C3%ADn+Mar%C3%ADa+Cristina/@19.289967,-99.9551998,11z/data=!4m9!1m2!2m1!1ssalon+cristina!3m5!1s0x85cd89ca4f9cc363:0xd908e41b7f9f839b!8m2!3d19.289967!4d-99.6750484!15sCg5zYWxvbiBjcmlzdGluYVoQIg5zYWxvbiBjcmlzdGluYZIBFmZ1bmN0aW9uX3Jvb21fZmFjaWxpdHmaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUk5kM1pFWVVkbkVBReABAA">
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
        </div>
      </section>
    </>
  );
};

export default Location;
