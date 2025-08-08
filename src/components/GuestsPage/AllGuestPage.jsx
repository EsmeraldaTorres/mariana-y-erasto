import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./../invitacion.css";
import portada from "../../assets/img/foto-4.jpg";
import { motion } from "framer-motion"; // Importa Framer Motion
import { useGuest } from "../../Context/GuestContext";

const mesas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const STATUS_LABELS = {
  true: "confirmado",
  null: "sin confirmar",
  false: "no asistirá",
};

const FILTER_OPTIONS = ["Todos", "confirmados", "no asistira", "sin confirmar"];
const ETIQUETA_OPTIONS = ["Todos", "novia", "novio"];

const AllGuestPage = () => {
  const { eventData } = useGuest();
  const [guests, setGuests] = useState([]);
  const [confirmedPeople, setConfirmedPeople] = useState([]);
  const [noConfirmados, setNoConfirmados] = useState([]);
  const [noAsistiran, setNoAsistiran] = useState([]);
  const [arrayPeople, setArrayPeople] = useState([]);
  const [menu, setMenu] = useState("Todos");
  const [etiqueta, setEtiqueta] = useState("Todos");
  const [addTable, setAddTable] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Carga y prepara los datos desde Firestore
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "people"));
      const people = [];
      querySnapshot.forEach((doc) => {
        people.push({ id: doc.id, ...doc.data() });
      });
      setGuests(people);

      // Extraer todos los acompañantes y ordenarlos
      const allPeople = people.flatMap((p) =>
        (p.acompanist ?? []).map((a) => ({
          ...a,
          docId: p.id, // Aquí agregas el id del documento principal
        }))
      );
      console.log(allPeople, "allPeople");

      allPeople.sort((a, b) => a.principalName.localeCompare(b.principalName));

      setConfirmedPeople(allPeople.filter((p) => p.asist === true));
      console.log(confirmedPeople, "confirmedPeople");
      setNoConfirmados(allPeople.filter((p) => p.asist === null));
      setNoAsistiran(allPeople.filter((p) => p.asist === false));
      setArrayPeople(allPeople);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleDownloadExcel = () => {
    // Filtramos según el estado actual
    let dataToExport = [];

    const fuente =
      menu === "confirmados"
        ? confirmedPeople
        : menu === "no asistira"
        ? noAsistiran
        : menu === "sin confirmar"
        ? noConfirmados
        : arrayPeople;

    dataToExport =
      etiqueta === "Todos"
        ? fuente
        : fuente.filter((person) => person.etiqueta === etiqueta);

    // Mapeamos los datos para exportar
    const excelData = dataToExport.map((person, index) => ({
      No: index + 1,
      ID: person.docId,
      Familia: person.principalName,
      Invitado: person.name,
      Estado: person.asist
        ? "Confirmado"
        : person.asist === null
        ? "Sin confirmar"
        : "No asistirá",
      Etiqueta: person.etiqueta || "",
      Mesa: person.table || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invitados");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `invitados_${menu}_${etiqueta}.xlsx`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtra las personas según el menú y la etiqueta
  const getFilteredPeople = () => {
    let list = [];
    switch (menu) {
      case "confirmados":
        list = confirmedPeople;
        break;
      case "no asistira":
        list = noAsistiran;
        break;
      case "sin confirmar":
        list = noConfirmados;
        break;
      case "Todos":
      default:
        list = arrayPeople;
        break;
    }

    if (etiqueta !== "Todos") {
      list = list.filter((p) => p.etiqueta === etiqueta);
    }
    return list;
  };

  // Actualiza la mesa asignada para un invitado confirmado
  const handleTableChange = (index, table) => {
    setConfirmedPeople((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], table };
      return copy;
    });
  };

  // Actualiza las mesas asignadas en Firestore en batch
  const handleAssignTables = async () => {
    try {
      const batch = writeBatch(db);

      confirmedPeople.forEach((confirmedPerson) => {
        guests.forEach((guest) => {
          if (!Array.isArray(guest.acompanist)) return;

          let updated = false;
          const updatedAcompanist = guest.acompanist.map((a) => {
            if (
              a.name === confirmedPerson.name &&
              a.principalName === confirmedPerson.principalName
            ) {
              updated = true;
              return {
                ...a,
                asist: confirmedPerson.asist ?? a.asist,
                table: confirmedPerson.table ?? a.table ?? null,
              };
            }
            return a;
          });

          if (updated) {
            const guestRef = doc(db, "people", guest.id);
            batch.update(guestRef, { acompanist: updatedAcompanist });
          }
        });
      });

      await batch.commit();
      setOpenModal(true);
    } catch (error) {
      console.error("Error actualizando documentos: ", error);
    }
  };

  // Genera y descarga el PDF con la tabla
  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const table = document.getElementById("pdf-table");
    if (!table) return;

    const headers = Array.from(table.querySelectorAll("thead th")).map(
      (th) => th.innerText
    );
    const rows = Array.from(table.querySelectorAll("tbody tr")).map((tr) =>
      Array.from(tr.querySelectorAll("td")).map((td) => {
        const select = td.querySelector("select");
        return select ? select.value || "Sin asignar" : td.innerText;
      })
    );

    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 20,
      styles: { fontSize: 8, cellPadding: 3 },
      theme: "grid",
      headStyles: { fillColor: [52, 73, 94] },
    });

    doc.save("table.pdf");
  };

  // Renderizado de filas para la tabla de invitados
  const renderRows = (people, showTableSelect = false) =>
    people.map((person, idx) => (
      <tr key={person.id || idx}>
        <td className="text-gray">{idx + 1}</td>
        <td>{person.docId}</td>
        <td>{person.principalName}</td>
        <td>{person.name}</td>
        {showTableSelect && (
          <td>
            <select
              className="select-mesas"
              value={person.table || ""}
              onChange={(e) => handleTableChange(idx, e.target.value)}
            >
              <option value="">Selecciona mesa...</option>
              {mesas.map((num) => (
                <option key={num} value={num}>
                  {`Mesa ${num}`}
                </option>
              ))}
            </select>
          </td>
        )}
        <td>{STATUS_LABELS[String(person.asist)]}</td>
        <td>{person.etiqueta}</td>
      </tr>
    ));

  // Título y conteo para cada menú
  const renderTitle = () => {
    const counts = {
      Todos: guests.flatMap((p) => p.acompanist ?? []).length,
      confirmados: confirmedPeople.length,
      "no asistira": noAsistiran.length,
      "sin confirmar": noConfirmados.length,
    };
    const filteredCount = getFilteredPeople().length;

    return (
      <>
        <h3 className="display-4 font-gold font-paris text-center">
          {menu === "Todos" ? "Todos los Invitados" : `Invitados ${menu}`}{" "}
          {etiqueta !== "Todos" ? `de ${etiqueta}` : ""}
          <br />
          <small>{filteredCount} invitado(s)</small>
        </h3>
      </>
    );
  };

  return (
    <div className="p-0">
      <div className="">
        <img src={portada} className="portada-img" alt="" />
      </div>
      <div className="text-center lead mb-3">
        {eventData.groom} & {eventData.bride}
      </div>
      {renderTitle()}

      {/* Filtros */}
      <div className="filter-container flex-column w-100">
        <div className="d-flex justify-content-around filter-container w-100">
          <div className="label-and-select d-flex align-items-center justify-content-center">
            <span className="display-6 p-1">Filtrar por status</span>
            <select
              className="display-5 select-mesas"
              value={menu}
              onChange={(e) => setMenu(e.target.value)}
            >
              {FILTER_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="my-4 label-and-select d-flex align-items-center justify-content-center">
            <span className="display-6 p-1">Filtrar por etiqueta</span>
            <select
              className="display-5 select-mesas"
              value={etiqueta}
              onChange={(e) => setEtiqueta(e.target.value)}
            >
              {ETIQUETA_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="w-100 d-flex justify-content-center align-items-center">
            <button
              className="btn-download mt-0 btn-no-asistir btn-min-w ml-4 p-3 "
              onClick={handleDownloadExcel}
            >
              Descargar Excel
            </button>
          </div>
        </div>

        <div>
          <div className="text-center px-4 text-gray">
            Para agregar mesa, coloca el filtro status "confirmados" y etiqueta
            "Todos"
          </div>
        </div>
      </div>

      {/* Tabla y botones según menú */}
      {menu === "confirmados" ? (
        <>
          {!addTable &&
            getFilteredPeople().length != 0 &&
            etiqueta === "Todos" && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }} // Empieza pequeño y transparente
                  animate={{ opacity: 1, scale: 1 }} // Hace zoom hacia afuera y aparece
                  exit={{ opacity: 0, scale: 0.8 }} // Se oculta haciendo zoom hacia adentro
                  transition={{ duration: 0.4, ease: "easeOut" }} // Duración de la animación
                >
                  <div className="d-flex align-items-center box-add-table justify-content-center ">
                    <p className="mt-4 mr-4 mb-0 p-4 text-center">
                      ¿Ya es hora de organizar a los invitados en mesa? Da click
                      en el siguiente boton ❤️
                    </p>
                    <button
                      className="m-2 btn"
                      onClick={() => setAddTable(true)}
                    >
                      Agregar mesa
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} // Empieza pequeño y transparente
            animate={{ opacity: 1, scale: 1 }} // Hace zoom hacia afuera y aparece
            exit={{ opacity: 0, scale: 0.8 }} // Se oculta haciendo zoom hacia adentro
            transition={{ duration: 0.4, ease: "easeOut" }} // Duración de la animación
          >
            <div className="table-container">
              <div className="desktop-none p-2">
                Desliza hacia la izquierda para ver todo el contenido de la
                tabla
              </div>
              <table className="table-width">
                <thead>
                  <tr>
                    <th className="p-2 text-gray">No.</th>
                    <th className="p-2">ID</th>
                    <th className="p-2">Familia o Invitado principal</th>
                    <th className="p-2">Invitado</th>
                    {addTable && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }} // Empieza pequeño y transparente
                        animate={{ opacity: 1, scale: 1 }} // Hace zoom hacia afuera y aparece
                        exit={{ opacity: 0, scale: 0.8 }} // Se oculta haciendo zoom hacia adentro
                        transition={{ duration: 0.4, ease: "easeOut" }} // Duración de la animación
                      >
                        {" "}
                        <th className="p-2">Mesa</th>
                      </motion.div>
                    )}
                    <th className="p-2">Status</th>
                    <th className="p-2">Etiqueta</th>
                  </tr>
                </thead>
                <tbody>{renderRows(getFilteredPeople(), addTable)}</tbody>
              </table>
            </div>
          </motion.div>

          {addTable && (
            <>
              <button
                className="btn-save mt-4 w-100 btn-save-guest mr-4"
                onClick={handleAssignTables}
              >
                Guardar cambios
              </button>
              <button
                className="btn-download mt-4 w-100 btn-no-asistir btn-download-pdf-guest ml-4 p-3"
                onClick={handleDownloadPdf}
              >
                Descargar PDF
              </button>
              <button
                className="btn-download mt-4 w-10 btn-no-asistir btn-min-w ml-4 p-3"
                onClick={handleDownloadExcel}
              >
                Descargar Excel
              </button>
            </>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} // Empieza pequeño y transparente
          animate={{ opacity: 1, scale: 1 }} // Hace zoom hacia afuera y aparece
          exit={{ opacity: 0, scale: 0.8 }} // Se oculta haciendo zoom hacia adentro
          transition={{ duration: 0.4, ease: "easeOut" }} // Duración de la animación
        >
          <div className="table-container">
            <div className="desktop-none p-2">
              Desliza hacia la izquierda para ver todo el contenido de la tabla
            </div>
            <table className="table-width">
              <thead>
                <tr>
                  <th className="p-2 text-gray">No.</th>
                  <th className="p-2">ID</th>
                  <th className="p-2">Familia o Invitado principal</th>
                  <th className="p-2">Invitado</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Etiqueta</th>
                </tr>
              </thead>
              <tbody>{renderRows(getFilteredPeople())}</tbody>
            </table>
          </div>
        </motion.div>
      )}
      {/* Resumen general */}
      {menu === "Todos" && (
        <div className="table-container pb-4 mb-4">
          <div className="mt-4">
            <div className="display-6 mb-2">
              Total de Invitados:{" "}
              <span className="f-w-700">
                {guests.flatMap((p) => p.acompanist ?? []).length}
              </span>
            </div>
            <div className="display-6 mb-2">
              Confirmados:{" "}
              <span className="f-w-700">{confirmedPeople.length}</span>
            </div>
            <div className="display-6 mb-2">
              No asistirán:{" "}
              <span className="f-w-700">{noAsistiran.length}</span>
            </div>
            <div className="display-6">
              Faltan por confirmar:{" "}
              <span className="f-w-700">{noConfirmados.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {openModal && (
        <div className="modal-pases" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-cerrar">
            <div className="modal-content">
              <div className="modal-header"></div>
              <div className="modal-body text-center font-paris display-5 bg-white p-4 border-1">
                ¡Datos actualizados!
                <div className="modal-footer justify-content-center">
                  <button
                    onClick={() => setOpenModal(false)}
                    type="button"
                    className="btn-cerrar justify-content-center"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllGuestPage;
