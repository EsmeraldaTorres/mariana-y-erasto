import React from "react";
import logoLiverpool from "../../assets/img/LIVERPOOL-logo.png";
import decoration from "../../assets/img/3.png";
import lineaAlReves from "../../assets/img/3.png";
import { useGuest } from "../../Context/GuestContext";

const GiftSection = () => {
  const { eventData } = useGuest();

  return (
    <>
      <section className="p-4" data-aos="zoom-in" data-aos-duration="2000">
        <DecorativeLine img={lineaAlReves} />
        <TextBlock text="¡Que nos acompañes es lo más importante! Y si está en tu disposición realizar una muestra de cariño, estaremos muy agradecidos" />
        <div className="py-4 d-flex justify-content-center align-items-center">
          <img
            loading="lazy"
            className="line rotate-180"
            src={lineaAlReves}
            alt="línea decorativa"
          />
        </div>
      </section>

      {/* Mesa de regalos */}
      <section
        id="mesa"
        className="window-regalos d-flex justify-content-center align-items-center"
      >
        <div className="w-75 d-flex justify-content-center">
          <div
            className="card-regalos p-4"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <h2 className="display-4 text-center pt-4 font-paris">
              Mesa de Regalos
            </h2>
            <Divider />
            <div className="row d-flex justify-content-around align-items-center">
              <GiftOption
                icon={
                  <img
                    loading="lazy"
                    className="logo-liverpool"
                    src={logoLiverpool}
                    alt="logo Liverpool"
                  />
                }
                link="https://www.liverpool.com.mx/tienda/home"
                buttonText="Ir a mesa de regalos"
              />
              {/* <GiftOption
                icon={<i className="bi bi-envelope icon-sobre"></i>}
                text="Sobre con dinero en efectivo"
              /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Transferencia bancaria */}
      {/* <section className="d-flex justify-content-center align-items-center">
        <div className="w-75 py-4 text-center mt-4">
          <TransferLine text="¡Gracias por tus muestras de cariño!" />
          <TransferLine text="Si así lo prefieres, también puedes hacer transferencia" />
          <Divider />
          <p className="display-number">4027 6653 0576 7718</p>
          <p>Arturo Jiménez Díaz</p>
          <p>BBVA</p>
        </div>
      </section> */}
    </>
  );
};

// Subcomponentes reutilizables
const DecorativeLine = ({ img }) => (
  <div className="py-4 d-flex justify-content-center align-items-center">
    <img loading="lazy" className="line" src={img} alt="línea decorativa" />
  </div>
);

const TextBlock = ({ text }) => (
  <div className="py-4 d-flex justify-content-center">
    <p className="w-75 text-center lead">{text}</p>
  </div>
);

const Divider = () => (
  <div className="d-flex justify-content-center">
    <hr className="text-center" />
  </div>
);

const GiftOption = ({ icon, link, buttonText, text }) => (
  <div className="col-md-6">
    <div className="pt-4 d-flex justify-content-center align-items-center">
      {icon}
    </div>
    {link ? (
      <div className="d-flex justify-content-center">
        <a
          href={link}
          className="w-75 d-flex justify-content-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="btn btn-light display-6 text-center my-3 p-2">
            {buttonText} <i className="bi bi-box-arrow-up-right"></i>
          </button>
        </a>
      </div>
    ) : (
      <div className="d-flex justify-content-center">
        <p className="w-75 text-center display-6 text-shadow">{text}</p>
      </div>
    )}
  </div>
);

const TransferLine = ({ text }) => (
  <p className="display-6" data-aos="flip-up" data-aos-duration="2000">
    {text}
  </p>
);

export default GiftSection;
