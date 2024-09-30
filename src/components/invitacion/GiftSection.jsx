import React from "react";
import logoLiverpool from "../../assets/img/LIVERPOOL-logo.png";
import decoration from "../../assets/img/Untitled design (3).png";
import lineaAlReves from "../../assets/img/lineaalreves.png";

const GiftSection = () => {
  return (
    <>
      <section className="p-4" data-aos="zoom-in" data-aos-duration="2000">
        <div className="py-4 d-flex justify-content-center align-items-center">
          <img loading="lazy" className="line" src={lineaAlReves} alt="linea" />
        </div>
        <div className="py-4 d-flex justify-content-center">
          <p className="text2 text-center lead">
            ¡Que nos acompañes es lo más importante! Y sí está en tu disposición
            realizar una muestra de cariño estaremos muy agradecidos
          </p>
        </div>
        <div className="pb-4 d-flex justify-content-center align-items-center">
          <img loading="lazy" className="line" src={decoration} alt="linea" />
        </div>
      </section>
      <section className="window-regalos d-flex justify-content-center align-items-center">
        <div className="w-80 h-80 d-flex justify-content-center">
          <div
            className="card-regalos p-4"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <p className="display-4 text-center pt-4 font-paris">
              Mesa de Regalos
            </p>
            <div className="d-flex justify-content-center">
              <hr className="text-center" />
            </div>
            <div className="row d-flex justify-content-around align-items-center">
              <div className="col-md-6">
                <div className="d-flex pt-4 justify-content-center align-items-center">
                  <img
                    loading="lazy"
                    className="logo-liverpool"
                    src={logoLiverpool}
                    alt="logo"
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <a
                    href="https://www.liverpool.com.mx/tienda/home"
                    className="w-80 d-flex justify-content-center"
                  >
                    <button className="btn btn-light display-6 text-center my-3 p-2">
                      Ir a mesa de regalos
                      <i className="bi bi-box-arrow-up-right"></i>
                    </button>
                  </a>
                </div>
              </div>
              <div className="col-md-6">
                <div className="pt-4 d-flex justify-content-center">
                  <i className="bi bi-envelope icon-sobre"></i>
                </div>
                <div className="d-flex justify-content-center">
                  <p className="w-80 text-center display-6 text-shadow">
                    Sobre con dinero en efectivo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="d-flex justify-content-center align-items-center">
        <div className="w-80 py-4 text-center mt-4">
          <p className="display-6" data-aos="flip-up" data-aos-duration="2000">
            ¡Gracias por tus muestras de cariño!
          </p>
          <div>
            <p
              className="display-6"
              data-aos="flip-up"
              data-aos-duration="2000"
            >
              Si así lo prefieres, también puedes hacer transferencia
            </p>
            <div className="d-flex justify-content-center">
              <hr />
            </div>
            <p className="display-number">4027 6653 0576 7718</p>
            <p>Arturo Jiménez Díaz</p>
            <p>BBVA</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default GiftSection;
