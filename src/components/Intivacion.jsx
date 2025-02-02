import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// Components
import FirstPage from "./invitacion/FirstPage";
import SecondPage from "./invitacion/SecondPage";
import ParentsSection from "./invitacion/ParentsSection";
import GodparentsSection from "./invitacion/GodparentsSection";
import Itinerary from "./invitacion/Itinerary";
import Location from "./invitacion/Location";
import GiftSection from "./invitacion/GiftSection";
import PhotoSection from "./invitacion/PhotoSection";
import Sobre from "./invitacion/Sobre";
import LastPage from "./invitacion/LastPage";
import QRCode from "qrcode.react";
import AddToMobileCalendar from "./invitacion/AddToMobileCalendar";
import AddToGoogleCalendar from "./invitacion/AddToGoogleCalendar";
import jsPDF from "jspdf";

// Libraries
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";
import { useState, useRef } from "react";
import decoration from "../assets/img/Untitled design (3).png";

// Styles
import "animate.css";
import "aos/dist/aos.css";
import "./invitacion.css";
import AOS from "aos";

// Context
import { useGuest } from "../Context/GuestContext";

// React Router
import { Link, useParams } from "react-router-dom";
import HotelSection from "./invitacion/HotelSection";
import DinamicGallerySection from "./invitacion/DinamicGallerySection";
import DressCode from "./invitacion/DressCode";
import PhotoGallerySection from "./invitacion/PhotoGallerySection";

const Intivacion = () => {
  const audioRef = useRef(null);
  const {
    guest,
    setGuest,
    fetchDataByGuest,
    reservationDone,
    setReservationDone,
  } = useGuest();

  const [isPlaying, setIsPlaying] = useState(false);
  const [openInvitation, setOpenInvitation] = useState(false);
  const [hide, setHide] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [reservationDeny, setReservationDeny] = useState(false);
  const [ticketsConfirmados, setTicketsConfirmados] = useState();
  const [confirmAsistence, setConfirmAsistence] = useState(false);
  const [cancelAsistence, setCancelAsistence] = useState(false);
  const [continuar, setContinuar] = useState(false);

  const printRef = useRef();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  const [text, setText] = useState({
    firstText:
      " Por favor confirma tu asistencia al evento antes del 15 de Octubre, después de esta fecha la confirmación no podrá realizarse.",
    secondText:
      "En caso de que no puedan asistir, por favor, también háznoslo saber.",
    thirdText:
      "En caso de que no puedas asistir, por favor, también háznoslo saber.",
  });

  let { id, code } = useParams();

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.audioEl.current.pause();
    } else {
      audioRef.current.audioEl.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  function abrir() {
    setOpenInvitation(true);
    window.scrollTo(0, 0);
    setTimeout(function () {
      setHide(false);
      togglePlayPause();
    }, 2500);
  }

  const handleCheckboxChange = (index, boolean) => {
    const updatedAccompanist = [...guest.acompanist];
    updatedAccompanist[index].asist = boolean;
    setGuest({ ...guest, acompanist: updatedAccompanist });
  };

  const handleContinuar = (e) => {
    e.preventDefault();
    console.log("hola");
    setLoading(true);
    setContinuar(true);
    setConfirmAsistence(false);
    setTimeout(() => {
      setLoading(false);
      setContinuar(false);
      setReservationDone(true);
    }, 4000);
  };

  useEffect(() => {
    if (openModal) {
      document.body.classList.add("overflow-hidden");
      // document.body.classList.add("postion-fixed");
    } else {
      document.body.classList.remove("overflow-hidden");
      // document.body.classList.remove("postion-fixed");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
      // document.body.classList.remove("postion-fixed");
    };
  }, [openModal]);

  const qrRef = useRef(null);

  const handleDownloadPdf = async () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Cargar la imagen de fondo
    const backgroundImageUrl =
      "https://images.pexels.com/photos/27060172/pexels-photo-27060172/free-photo-of-blanco-y-negro-naturaleza-pareja-amor.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    const backgroundImage = new Image();
    backgroundImage.src = backgroundImageUrl;

    backgroundImage.onload = () => {
      // Agregar la imagen de fondo en todo el tamaño de la hoja
      pdf.addImage(backgroundImage, "JPEG", 0, 0, pdfWidth, pdfHeight);

      // Posicionar el título encima de la imagen
      pdf.setFontSize(24);
      pdf.setTextColor(255, 255, 255); // Color blanco para el texto
      pdf.text("Tickets Boda Arturo y Noemí", pdfWidth / 2, 100, {
        align: "center",
      });

      // Renderizar el QR desde el canvas y agregarlo al PDF
      const qrCanvas = qrRef.current.querySelector("canvas");
      if (qrCanvas) {
        const qrImageData = qrCanvas.toDataURL("image/png");
        pdf.addImage(qrImageData, "PNG", pdfWidth / 2 - 50, 120, 100, 100);
      }

      // Guardar el PDF
      pdf.save("tickets_boda_arturo_noemi.pdf");
    };
  };
  useEffect(() => {
    console.log(guest, "guest");
    const filterGuestNull = guest?.acompanist?.filter((g) => g.asist === null);
    const filterGuestFalse = guest?.acompanist?.filter(
      (g) => g.asist === false
    );
    // Si ya todos los invitados han dado una respuesta entonces
    if (
      filterGuestNull?.length === 0 &&
      filterGuestFalse?.length != guest?.acompanist?.length
    ) {
      // El botón de obtener mis pases se habilita
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
      // setReservationDeny(true);
    }

    if (
      filterGuestFalse != undefined &&
      filterGuestFalse?.length === guest?.acompanist?.length &&
      openModal === false
    ) {
      setReservationDeny(true);
    }

    if (guest) {
      const filteredAcompanist = guest.acompanist.filter(
        (acomp) => acomp?.asist === true
      );
      setTicketsConfirmados(filteredAcompanist);
    }
  }, [guest]);

  useEffect(() => {
    AOS.init();

    if (id) {
      fetchDataByGuest(id, code);
    }
    const countDownDate = new Date("Dec 26, 2025 09:30").getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(intervalId);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true,
        });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, expired: false });
      }
    };
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const countDownDateAsistence = new Date("Oct 15, 2025 09:31").getTime();

    const countdownAsistence = () => {
      const now = new Date().getTime();
      const distance = countDownDateAsistence - now;

      if (distance < 0) {
        clearInterval(secondIntervalId);
        setText({ firstText: "", secondText: "" });
      }
    };

    const secondIntervalId = setInterval(countdownAsistence, 1000);

    return () => clearInterval(secondIntervalId);
  }, []);

  return (
    <div className={` w-100 ${!openInvitation && "avoiding-scroll"}`}>
      {/* Sobre */}
      <Sobre
        abrir={abrir}
        openInvitation={openInvitation}
        hide={hide}
        openModal={openModal}
      />
      {/* <!-- Invitacion --> */}
      <div id="invitacion" className={`invitacion ${hide ? "hide" : ""}`}>
        <FirstPage
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          audioRef={audioRef}
        />
        <SecondPage timeLeft={timeLeft} />
        <section className="pase">
          <p className="m-0 display-6">El inicio de la familia Juárez Macías</p>
        </section>
        <ParentsSection />
        <section className="container3 bg-gold p-4 m-0">
          <div className="d-flex justify-content-center">
            <p className="w-80 text-center text-white display-6 m-0 p-2">
              Compartir estos momentos con ustedes, los hace inolvidables.
            </p>
          </div>
        </section>
        <GodparentsSection />
        <section className="container3 bg-gold p-4 m-0">
          <div className="d-flex justify-content-center">
            <p className="w-50 text-center text-white m-0 p-2 display-6">
              ¡Nos gustaría mucho que nos acompañaras!
            </p>
          </div>
        </section>
        <Itinerary />
        <Location />
        <PhotoSection />
        <GiftSection />
        <section className="bg-gray p-3">
          <p className="text-center p-0 m-0">
            <i className="bi bi-hearts"></i>¡Gracias por tus muestras de cariño!
          </p>
        </section>
        <HotelSection />

        <section className="pase bg-gold p-4">
          <p className="text-white text-center display-6">
            Este día será muy especial y que asistas ¡lo hará aún más!
          </p>
        </section>
        <DinamicGallerySection />
        <section className="bg-gray p-3">
          <p className="text-center p-0 m-0">
            <i className="bi bi-hearts"></i>Respetuosamente NO NIÑOS
          </p>
        </section>
        <DressCode />
        <PhotoGallerySection />
        <section className="pase bg-gold p-4">
          <p className="text-white text-center display-6">
            Este día es muy especial y que vayas ¡lo hace aún más!
          </p>
        </section>
        <section className="text-center p-4 lead overflow-hidden">
          <h3
            className="font-paris principal-name-guest "
            data-aos="zoom-out"
            data-aos-duration="2000"
          >
            Familia Silván
          </h3>

          <p>Hemos reservado 3 lugares para ustedes</p>

          <div className={`${text.firstText === "" && "mb-4"}`}>
            {guest?.acompanist?.map((person, key) => (
              <p
                key={key}
                className="mb-0 display-6"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                {person.name}
              </p>
            ))}
          </div>

          {text.firstText != "" && (
            <p
              className="display-4 mt-4"
              data-aos="zoom-in"
              data-aos-duration="2000"
            >
              ¡Confirma tu asistencia!
            </p>
          )}
          <div className="pb-4 d-flex justify-content-center align-items-center">
            <img
              loading="lazy"
              src={decoration}
              alt="linae"
              className="decoration"
            />
          </div>
          <div
            className={`d-flex justify-content-center align-items-center flex-column ${
              text?.firstText != "" ? "mb-4" : "mb-0"
            }`}
          >
            <div
              className="w-80 py-4"
              data-aos="fade-in"
              data-aos-duration="3000"
            >
              Gracias por ayudarnos con la organización de nuestro evento.
              {text?.firstText != "" && (
                <>
                  <p
                    className="pt-2"
                    data-aos="fade-in"
                    data-aos-duration="2500"
                  >
                    {text.firstText}
                  </p>
                  <p
                    className="pt-2"
                    data-aos="fade-in"
                    data-aos-duration="3000"
                  >
                    {guest?.acompanist?.length === 1
                      ? text.thirdText
                      : text.secondText}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="d-flex flex-column overflow-hidden">
            {reservationDone ? (
              <>
                <div className="d-flex justify-content-center">
                  <button
                    className="mb-3 btn-save"
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    Ver mis pases <i className="bi bi-ticket font-icon"></i>
                  </button>
                </div>
              </>
            ) : reservationDeny ? (
              <div className="overflow-hidden">
                <p data-aos="fade-right" data-aos-duration="2000">
                  Haz confirmado que no podrás acompañarnos
                </p>
                <p data-aos="fade-left" data-aos-duration="2000">
                  Gracias por darnos tu respuesta
                </p>
              </div>
            ) : text?.firstText != "" ? (
              <>
                <div className="d-flex justify-content-center">
                  <button
                    className="mb-3 btn-save "
                    onClick={() => {
                      setOpenModal(true);
                      setConfirmAsistence(true);
                    }}
                  >
                    <p className="animate__animated animate__pulse animate__infinite mb-0">
                      <i className="bi bi-check text-white"></i> Confirmar
                    </p>
                  </button>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    onClick={(event) => {
                      setOpenModal(true);
                      setCancelAsistence(true);
                    }}
                    className="text-white btn-no-asistir"
                  >
                    <i className="bi bi-x "></i>
                    {guest?.acompanist?.length === 1
                      ? "No podré asistir"
                      : "No podremos asistir "}
                  </button>
                </div>
                <div className="display-6 mt-4">
                  <p>
                    Querida bride, esta es una invitación muestra genérica del
                    sistema de confirmación de asistencia.
                  </p>
                  <p>
                    Tenemos más funcionalidades PRECISAS que puedes ver en
                    nuestra página web o puedes solicitarla directamente con
                    Esmeralda
                  </p>
                  <p>
                    Te atenderemos con gusto
                  </p>
                </div>
              </>
            ) : (
              text.firstText === "" && (
                <div>
                  <p data-aos="zoom-out" data-aos-duration="2000">
                    El tiempo de confirmación de asistencia ha pasado.
                  </p>
                  <p data-aos="zoom-out" data-aos-duration="2000">
                    Tus pases han sido cancelados.
                  </p>
                </div>
              )
            )}
          </div>
          {openModal && (
            <div className={``}>
              <Modal
                show={openModal}
                className="w-100 h-100 d-flex justify-content-center align-items-center"
                onHide={() => setOpenModal(false)}
                aria-labelledby="example-custom-modal-styling-title"
              >
                <div
                  className={`modal-content ${
                    id && reservationDone && reservationDeny === false && "h-80"
                  }`}
                >
                  <Modal.Body
                    className={`${
                      reservationDone &&
                      reservationDeny === false &&
                      "p-1 w-90v"
                    }`}
                  >
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      {confirmAsistence ? (
                        <p className="font-paris display-3 text-center padding-4-rem pt-4 px-0">
                          ¡Gracias por darnos el sí!
                        </p>
                      ) : (
                        cancelAsistence && (
                          <p className="font-paris display-3 text-center mt-4">
                            ¡Te extrañaremos!
                          </p>
                        )
                      )}
                      {continuar ? (
                        <>
                          <p>Tus pases se están generando</p>
                        </>
                      ) : confirmAsistence ? (
                        <div className="padding-4-rem text-center">
                          <p>
                            Por favor, marca una respuesta por cada invitado y
                            después presiona en el botón{" "}
                            <span className="f-w-700">Continuar</span> para que
                            puedas generar tu pase al evento .
                          </p>
                        </div>
                      ) : reservationDone ? (
                        <div>
                          <div className="justify-content-center mt-4">
                            <div className="text-center">
                              <h2 className="font-paris font-gold mb-4 ">
                                Tickets {guest?.principalName}
                              </h2>
                              <h3 className="mb-4 ">
                                Favor de no escanear con ningún dispositivo
                              </h3>
                              <div ref={printRef}>
                                <div
                                  ref={qrRef}
                                  className="d-flex justify-content-center mt-4 mb-4"
                                >
                                  <QRCode
                                    value={
                                      "https://arturo-y-noemi-nuestra-boda-muestra.netlify.app/" +
                                      guest?.qrUrl
                                    }
                                  />
                                </div>
                                {guest?.acompanist?.map((acomp, index) => (
                                  <div
                                    key={index}
                                    className="w-100 d-flex justify-content-center flex-column"
                                  >
                                    <p className="mb-1 display-6 ">
                                      {acomp.name}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          {/* <div className="mb-4 mt-4">
                              <h3 className="font-gold text-center">
                                Muestra tu CÓDIGO QR{" "}
                                <span className="font-weigth-bold">solo</span> a
                                los recepcionistas del evento para entrar al
                                salón.
                              </h3>
                              
                              <p className="display-6 text-center my-4 p-0">
                                No compartas ésta invitación con nadie más ni
                                tus códigos QR.
                              </p>
                              <h1 className="text-center">Agendar Evento</h1>
                              <div className="text-center d-flex flex-column">
                                <AddToGoogleCalendar />
                                <AddToMobileCalendar />
                              </div>
                              <div className="pb-4 d-flex justify-content-center align-items-center">
                                <img
                                  loading="lazy"
                                  className="line"
                                  src={decoration}
                                  alt="linea"
                                />
                              </div>
                              <p className="lead text-center ">
                                Puedes descargar tus tickets o tomar una captura
                                de pantalla el día del evento para tenerlos a la
                                mano, también puedes acceder a ellos desde el
                                botón "ver mis pases" dentro de ésta invitación.
                              </p>
                              <p className="lead text-center ">
                                No escanees los códigos antes del evento, solo
                                los recepcionistas del salón podrán hacerlo.
                              </p>
                              {guest && ticketsConfirmados?.length != 0 && (
                                <div className="w-100 justify-content-center d-flex align-items-center mb-4">
                                  <button
                                    className="btn-descargar btn-agendar text-dark"
                                    onClick={handleDownloadPdf}
                                  >
                                    Descargar Tickets{" "}
                                  </button>
                                </div>
                              )}

                              <p className="mt-4 text-center">
                                Invitación hecha por{" "}
                                <Link
                                  className="font-gold"
                                  target="_blank"
                                  to="https://digital-invite-by-esmeralda.vercel.app/"
                                >
                                  Digital Invite by Esmeralda{" "}
                                </Link>
                              </p>
                              <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                                Contacto
                                <div className="d-flex justify-content-evenly w-80">
                                  <Link
                                    target="_blank"
                                    to="https://wa.me/524426147355?text=Hola%20Esmeralda!%20Me%20interesa%20contratar%20tu%20servicio. Necesito una invitación para (especifica tu evento)"
                                  >
                                    <i className="bi bi-whatsapp display-5 font-gold mx-2"></i>
                                  </Link>
                                  <Link
                                    target="_blank"
                                    to="https://www.facebook.com/digitalInviteByEsmeralda"
                                  >
                                    <i className="bi bi-facebook display-5 font-gold mx-2"></i>
                                  </Link>
                                  <Link
                                    target="_blank"
                                    to="https://www.instagram.com/digital_invite_by_esmeralda/"
                                  >
                                    <i className="bi bi-instagram display-5 font-gold mx-2"></i>
                                  </Link>
                                  <Link
                                    target="_blank"
                                    to="estorresag2019@gmail.com?subject=Información sobre invitación página web&body=Hola Esmeralda, mi nombre es (escribe tu nombre) y mi evento es (boda, XV años, graduación, etc). Me interesa que me envíes información sobre tus paquetes y costos."
                                  >
                                    <i className="bi bi-envelope display-5 font-gold mx-2"></i>
                                  </Link>
                                  <Link target="_blank" to="tel:+524426147355">
                                    <i className="bi bi-telephone-forward display-5 font-gold mx-2"></i>
                                  </Link>
                                </div>
                              </div>
                            </div>
                           */}
                        </div>
                      ) : (
                        cancelAsistence && (
                          <div className="text-center">
                            <h3 className="text-center">
                              Lamentamos que no puedas acompañarnos en este
                              momento
                            </h3>
                            <p></p>
                            Entendemos si no te es posible asistir y te
                            agradecemos tu honestidad. Esperamos celebrar
                            contigo o con ustedes en otro momento.
                            <p className="mt-3">Tus pases serán reasignados.</p>
                          </div>
                        )
                      )}
                    </div>
                    {confirmAsistence ? (
                      <>
                        <form className="d-flex flex-column align-items-center">
                          {guest?.acompanist?.map((accomp, index) => (
                            <>
                              <p
                                id={index}
                                className="mb-0 font-paris display-5"
                              >
                                {accomp.name}
                              </p>
                              <div className="d-flex mb-4 justify-content-center">
                                <div
                                  key={index}
                                  className="checkbox-wrapper-53"
                                >
                                  <label className="container">
                                    <div className="d-flex">
                                      <p className="mb-0">sí asistiré</p>
                                      <input
                                        id={index}
                                        type="checkbox"
                                        checked={accomp.asist}
                                        onChange={() =>
                                          handleCheckboxChange(index, true)
                                        }
                                      />
                                      <div className="checkmark"></div>
                                    </div>
                                  </label>
                                </div>
                                <div
                                  key={index}
                                  className="checkbox-wrapper-53"
                                >
                                  <label className="container">
                                    <div className="d-flex">
                                      <p className="mb-0">no podré asistir</p>
                                      <input
                                        id={index}
                                        type="checkbox"
                                        checked={accomp.asist === false}
                                        onChange={() =>
                                          handleCheckboxChange(index, false)
                                        }
                                      />
                                      <div className="checkmark"></div>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </>
                          ))}
                          <div className="d-flex flex-column">
                            <div className="d-flex justify-content-center w-100">
                              <button
                                onClick={(e) => {
                                  handleContinuar(e);
                                }}
                                disabled={disabledBtn}
                                className={`${
                                  disabledBtn
                                    ? "btn-save-disabled "
                                    : "btn-save w-100"
                                }`}
                                type="submit"
                              >
                                Continuar
                              </button>
                            </div>
                          </div>
                        </form>
                        <div className="modal-foote justify-content-between">
                          <div className="d-flex justify-content-center w-100 mb-4">
                            <button
                              onClick={() => {
                                setOpenModal(false);
                              }}
                              type="button"
                              className="btn-cerrar justify-content-center w-5"
                              data-bs-dismiss="modal"
                            >
                              Confirmar más tarde
                            </button>
                          </div>
                        </div>
                      </>
                    ) : loading ? (
                      <div className="d-flex justify-content-center align-items-center">
                        <div className="spinner-grow" role="status">
                          <span className="sr-only"></span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="modal-foote mb-4 d-flex flex-column align-items-center justify-content-between">
                          <button
                            onClick={() => {
                              setOpenModal(false);
                            }}
                            type="button"
                            className="btn-cerrar justify-content-center mb-4 w-50"
                            data-bs-dismiss="modal"
                          >
                            Cerrar
                          </button>
                        </div>
                      </>
                    )}
                  </Modal.Body>
                </div>
              </Modal>
            </div>
          )}
        </section>
        <LastPage reservationDeny={reservationDeny} />
      </div>
      {/* <!-- icons --> */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
      />
      {/* <!-- google fonts --> */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Parisienne&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default Intivacion;
