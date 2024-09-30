import React from "react";
import Carousel from "react-bootstrap/Carousel";
import iconLazo from "../../assets/img/lazo.png";
import iconCoin from "../../assets/img/coin.png";
import anillos from "../../assets/img/anillos.png";

const GodparentsSection = () => {
  return (
    <>
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
          <Carousel.Item>
            <div className="d-flex p-3 justify-content-center align-items-center">
              <div>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    loading="lazy"
                    className="icon-img"
                    src={anillos}
                    alt="Card image cap"
                  />
                </div>
                <p className="card-text text-center">Anillos</p>
                <p className="card-text text-center display-6">
                  Roberto Rodriguez Saenz
                </p>
                <p className="card-text text-center display-6">
                  Veronica Martínez Torres
                </p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex p-3 justify-content-center align-items-center">
              <div>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    loading="lazy"
                    className="icon-img"
                    src={iconCoin}
                    alt="Card image cap"
                  />
                </div>
                <p className="card-text text-center">Arras</p>
                <p className="card-text text-center display-6">
                  José Díaz Hernández
                </p>
                <p className="card-text text-center display-6">
                  Ilse Macías Hernández
                </p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex p-3 justify-content-center align-items-center">
              <div>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    loading="lazy"
                    className="icon-img"
                    src={iconLazo}
                    alt="Card image cap"
                  />
                </div>
                <p className="card-text text-center">Lazo</p>
                <p className="card-text text-center display-6">
                  Rogelio Martínez Loredo
                </p>
                <p className="card-text text-center display-6">
                  Ana Salazar Montes
                </p>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </section>
    </>
  );
};

export default GodparentsSection;
