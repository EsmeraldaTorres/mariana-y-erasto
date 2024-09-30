import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  doc,
  updateDoc,
} from "firebase/firestore";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";

import "./invitacion.css";

const AllGuestPage = () => {
  const [arrayPeople, setArrayPeople] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [confirmedPeople, setConfirmedPeople] = useState([]);
  const [noConfirmados, setNoConfirmados] = useState([]);
  const [noAsistiran, setNoasistiran] = useState([]);
  const [addTable, setAddTable] = useState(false);
  const [etiqueta, setEtiqueta] = useState("Todos");
  const [menu, setMenu] = useState("Todos");
  const [guests, setGuests] = useState([]);
  const mesas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const tableRef = useRef(null);
  const pdfContentRef = useRef(null);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "people"));
      const people = [];
      querySnapshot.forEach((doc) => {
        const data = JSON.parse(JSON.stringify(doc.data(), null, 2));
        people.push(data);
      });
      setGuests(people);
      const groups = people?.map((gruop) => gruop?.acompanist);
      let allPeople = [];
      const sacar = groups?.forEach((gruop) => {
        gruop?.map((person) => allPeople.push(person));
      });
      allPeople.sort((a, b) => {
        if (a.principalName < b.principalName) {
          return -1;
        }
        if (a.principalName > b.principalName) {
          return 1;
        }
        return 0;
      });

      let confirmados = allPeople?.filter((person) => person?.asist === true);
      let noConfirm = allPeople?.filter((person) => person?.asist === null);
      let noAsist = allPeople?.filter((person) => person?.asist === false);

      setArrayPeople(allPeople);
      setConfirmedPeople(confirmados);
      setNoasistiran(noAsist);
      setNoConfirmados(noConfirm);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleFilter = (value) => {
    setMenu(value);
  };

  const handleFilterEtiqueta = (value) => {
    setEtiqueta(value);
  };

  // const handleAssignTables = async () => {
  //   try {
  //     const batch = writeBatch(db);

  //     // Recorrer la lista de invitados confirmados (confirmedPeople)
  //     confirmedPeople.forEach((simpleObj) => {
  //       console.log(`Procesando: ${simpleObj.name}, Table: ${simpleObj.table}`);

  //       // Recorrer los invitados (guests) para buscar el invitado correcto
  //       guests.forEach((nestedObj) => {
  //         if (Array.isArray(nestedObj.acompanist)) {
  //           // Buscar al invitado o acompañante que coincide con el nombre en confirmedPeople
  //           let found = false;
  //           nestedObj.acompanist = nestedObj.acompanist.map((acompanistObj) => {
  //             if (acompanistObj.name === simpleObj.name) {
  //               console.log(`Coincidencia encontrada: ${acompanistObj.name}`);
  //               found = true;
  //               return {
  //                 ...acompanistObj,
  //                 asist:
  //                   simpleObj.asist !== undefined
  //                     ? simpleObj.asist
  //                     : acompanistObj.asist,
  //                 table:
  //                   simpleObj.table !== undefined
  //                     ? simpleObj.table
  //                     : acompanistObj.table || null,
  //               };
  //             }
  //             return acompanistObj;
  //           });

  //           // Si se encontró una coincidencia y hay cambios, actualizar el documento
  //           if (found && nestedObj.id) {
  //             const guestRef = doc(db, "people", nestedObj.id);
  //             console.log(
  //               `Actualizando documento ${nestedObj.id} en Firestore`
  //             );

  //             batch.update(guestRef, { acompanist: nestedObj.acompanist });
  //           }
  //         } else {
  //           console.error(
  //             `nestedObj.acompanist no es un arreglo o es undefined. Invitado: ${nestedObj.name}`
  //           );
  //         }
  //       });
  //     });

  //     // Commit de los cambios
  //     await batch.commit();
  //     console.log("Documentos actualizados correctamente en Firestore.");
  //     setOpenModal(true);
  //   } catch (error) {
  //     console.error("Error actualizando documentos: ", error);
  //   }
  // };
  const handleAssignTables = async () => {
    try {
      const batch = writeBatch(db);

      // Recorrer la lista de invitados confirmados (confirmedPeople)
      confirmedPeople.forEach((simpleObj) => {
        console.log(`Procesando: ${simpleObj.name}, Table: ${simpleObj.table}`);

        // Recorrer los invitados (guests) para buscar el invitado correcto
        guests.forEach((nestedObj) => {
          if (Array.isArray(nestedObj.acompanist)) {
            // Buscar al invitado o acompañante que coincide con el nombre en confirmedPeople
            let found = false;
            nestedObj.acompanist = nestedObj.acompanist.map((acompanistObj) => {
              console.log(acompanistObj, "acompanistObjet que viene de Guest");
              console.log(simpleObj, "acompanistObjet que viene de Confirmed");

              if (
                acompanistObj.name === simpleObj.name &&
                acompanistObj.principalName === simpleObj.principalName
              ) {
                console.log(`Coincidencia encontrada: ${acompanistObj.name}`);
                found = true;
                return {
                  ...acompanistObj,
                  asist:
                    simpleObj.asist !== undefined
                      ? simpleObj.asist
                      : acompanistObj.asist,
                  table:
                    simpleObj.table !== undefined
                      ? simpleObj.table
                      : acompanistObj.table || null,
                };
              }
              return acompanistObj;
            });

            // Si se encontró una coincidencia y hay cambios, actualizar el documento
            if (found && nestedObj.id) {
              const guestRef = doc(db, "people", nestedObj.id);
              console.log(
                `Actualizando documento ${nestedObj.id} en Firestore`
              );

              batch.update(guestRef, { acompanist: nestedObj.acompanist });
            }
          } else {
            console.error(
              `nestedObj.acompanist no es un arreglo o es undefined. Invitado: ${nestedObj.name}`
            );
          }
        });
      });

      // Commit de los cambios
      await batch.commit();
      console.log("Documentos actualizados correctamente en Firestore.");
      setOpenModal(true);
    } catch (error) {
      console.error("Error actualizando documentos: ", error);
    }
  };

  const handleTableChange = (index, table) => {
    const updatedAccompanist = [...confirmedPeople];
    updatedAccompanist[index].table = table;
    console.log(updatedAccompanist, "updateAcompanist");
    setConfirmedPeople(updatedAccompanist);
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const table = document.getElementById("pdf-table");
    const rows = [];
    const headers = [];
    const addTable = true;

    const headerCells = table.querySelectorAll("thead th");
    headerCells.forEach((headerCell) => {
      headers.push(headerCell.innerText);
    });

    const tableRows = table.querySelectorAll("tbody tr");
    tableRows.forEach((row) => {
      const rowData = [];
      row.querySelectorAll("td").forEach((cell) => {
        // Si la celda contiene un select, obtener el valor seleccionado
        if (cell.querySelector("select")) {
          rowData.push(cell.querySelector("select").value || "Sin asignar");
        } else {
          rowData.push(cell.innerText);
        }
      });
      rows.push(rowData);
    });

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <div>
        {menu === "Todos" ? (
          <>
            <h3 className=" display-4 font-gold font-paris text-center">
              Todos los Invitados{" "}
              {etiqueta === "Todos"
                ? arrayPeople.length
                : etiqueta === "novia"
                ? arrayPeople?.filter((person) => person?.etiqueta === "novia")
                    .length
                : etiqueta === "novio" &&
                  arrayPeople?.filter((person) => person?.etiqueta === "novio")
                    .length}
            </h3>
            <p className="display-4 font-paris text-center">
              {etiqueta != "Todos" && `de ${etiqueta}`}
            </p>
          </>
        ) : menu === "no asistira" ? (
          <>
            <h3 className=" display-4 font-gold font-paris text-center">
              Invitados que {menu}{" "}
              {etiqueta === "Todos"
                ? noAsistiran.length
                : etiqueta === "novia"
                ? noAsistiran?.filter((person) => person?.etiqueta === "novia")
                    .length
                : etiqueta === "novio" &&
                  noAsistiran?.filter((person) => person?.etiqueta === "novio")
                    .length}
            </h3>
            <p className="display-4 font-paris text-center">{etiqueta}</p>
          </>
        ) : menu === "confirmados" ? (
          <>
            <h3 className=" display-4 font-gold font-paris text-center">
              Invitados {menu}{" "}
              {etiqueta === "Todos"
                ? confirmedPeople.length
                : etiqueta === "novia"
                ? confirmedPeople?.filter(
                    (person) => person?.etiqueta === "novia"
                  ).length
                : etiqueta === "novio" &&
                  confirmedPeople?.filter(
                    (person) => person?.etiqueta === "novio"
                  ).length}
            </h3>
            <p className="display-4  font-paris text-center">{etiqueta}</p>
          </>
        ) : (
          <>
            <h3 className=" display-4 font-gold font-paris text-center">
              Invitados por confirmar{" "}
              {etiqueta === "Todos"
                ? noConfirmados.length
                : etiqueta === "novia"
                ? noConfirmados?.filter(
                    (person) => person?.etiqueta === "novia"
                  ).length
                : etiqueta === "novio" &&
                  noConfirmados?.filter(
                    (person) => person?.etiqueta === "novio"
                  ).length}
            </h3>
            <p className="display-4  font-paris text-center">{etiqueta}</p>
          </>
        )}
        <div className="label-and-select">
          <span className="display-6 p-1">Filtrar por status</span>
          <select
            className="display-5 select-mesas"
            name="filter-guests"
            id=""
            onChange={(event) => {
              event.preventDefault();
              handleFilter(event.target.value);
            }}
          >
            <option value="Todos">Todos</option>
            <option value="confirmados">Confirmados</option>
            <option value="no asistira">No asistirá</option>
            <option value="sin confirmar">Sin Confirmar</option>
          </select>
        </div>
        <div className="my-4 label-and-select">
          <span className="display-6 p-1 ">Filtrar por etiqueta</span>
          <select
            className="display-5 p-1 select-mesas"
            name="filter-guests"
            id=""
            onChange={(event) => {
              event.preventDefault();
              handleFilterEtiqueta(event.target.value);
            }}
          >
            <option value="Todos">Todos</option>
            <option value="novia">Novia</option>
            <option value="novio">Novio</option>
          </select>
        </div>
        {menu === "Todos" ? (
          <>
            <table className="table-width">
              <thead>
                <tr>
                  <th>Familia</th>
                  <th>Invitado</th>
                  <th>Status</th>
                  <th>Etiqueta</th>
                </tr>
              </thead>

              {etiqueta === "Todos" ? (
                <tbody>
                  {arrayPeople &&
                    arrayPeople.map((person, key) => (
                      <tr key={key}>
                        <td>{person.principalName}</td>
                        <td>{person.name}</td>
                        <td>
                          {person.asist
                            ? "confirmado"
                            : person.asist === null
                            ? "sin confirmar"
                            : "No asistirá"}
                        </td>
                        <td>{person.etiqueta}</td>
                      </tr>
                    ))}
                </tbody>
              ) : (
                <tbody>
                  {arrayPeople &&
                    arrayPeople.map(
                      (person) =>
                        person.etiqueta === etiqueta && (
                          <tr key={person.id}>
                            <td>{person.principalName}</td>

                            <td>{person.name}</td>
                            <td>
                              {person.asist
                                ? "confirmado"
                                : person.asist === null
                                ? "sin confirmar"
                                : "No asistirá"}
                            </td>
                            <td>{person.etiqueta}</td>
                          </tr>
                        )
                    )}
                </tbody>
              )}
            </table>
            <div className="mt-4">
              <div className="display-6 mb-2">
                Total de Invitados:{" "}
                <span className="f-w-700">{arrayPeople.length}</span>
              </div>
              <div className="display-6 mb-2">
                Confirmardos:{" "}
                <span className="f-w-700">{confirmedPeople.length}</span>
              </div>
              <div className="display-6 mb-2">
                No asisitirán:{" "}
                <span className="f-w-700">{noAsistiran.length}</span>
              </div>
              <div className="display-6">
                Faltan por confirmar:{" "}
                <span className="f-w-700">{noConfirmados.length}</span>
              </div>
            </div>
          </>
        ) : menu === "confirmados" ? (
          <>
            {etiqueta === "Todos" && (
              // arrayPeople.filter((person) => person.table).length === 0 && (
              <div className="d-flex align-items-center box-add-table">
                <p className="mt-4 mr-4 mb-0">
                  Para organizar a los invitados en mesas, da click en el
                  siguiente botón:
                </p>
                <button
                  className="mx-2 btn "
                  onClick={() => {
                    setAddTable(true);
                  }}
                >
                  Agregar mesa
                </button>
              </div>
            )}
            <div style={{ overflowX: "auto" }}>
              <table id="pdf-table" className="mt-4">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Familia</th>
                    <th>Invitado</th>
                    {addTable && <th>Mesa</th>}
                    <th>Status</th>
                    <th>Etiqueta</th>
                  </tr>
                </thead>
                {etiqueta === "Todos" ? (
                  <>
                    <tbody>
                      {confirmedPeople &&
                        confirmedPeople?.map((person, key) => (
                          <>
                            <tr key={key}>
                              <td>{key + 1}</td>
                              <td>{person.principalName}</td>
                              <td>{person.name}</td>
                              {addTable && (
                                <td className="">
                                  <select
                                    className="select-mesas"
                                    value={person.table || ""}
                                    onChange={(e) =>
                                      handleTableChange(key, e.target.value)
                                    }
                                  >
                                    <option value="">Selecciona mesa...</option>
                                    {mesas.map((num) => (
                                      <option
                                        key={num}
                                        value={num}
                                      >{`Mesa ${num}`}</option>
                                    ))}
                                  </select>
                                </td>
                              )}
                              <td>{person.asist && "confirmado"}</td>
                              <td>{person.etiqueta}</td>
                            </tr>
                          </>
                        ))}
                    </tbody>
                  </>
                ) : (
                  <tbody>
                    {confirmedPeople &&
                      confirmedPeople.map(
                        (person, key) =>
                          person.etiqueta === etiqueta && (
                            <>
                              <tr key={person.id}>
                                <td>{person.principalName}</td>

                                <td>{person.name}</td>
                                <td>{person.asist && "confirmado"}</td>
                                <td>{person.etiqueta}</td>
                              </tr>
                            </>
                          )
                      )}
                  </tbody>
                )}
              </table>
            </div>
            {etiqueta === "Todos" && addTable && (
              <>
                <button
                  className="btn-save mt-4 w-100 btn-min-w mr-4"
                  onClick={handleAssignTables}
                >
                  Guardar cambios
                </button>
                <button
                  className="btn-download mt-4 w-100 btn-no-asistir btn-min-w ml-4 p-3"
                  onClick={handleDownloadPdf}
                >
                  Descargar PDF
                </button>
              </>
            )}
          </>
        ) : menu === "sin confirmar" ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Familia</th>

                  <th>Invitado</th>
                  <th>Status</th>
                  <th>Etiqueta</th>
                </tr>
              </thead>
              {etiqueta === "Todos" ? (
                <tbody>
                  {noConfirmados &&
                    noConfirmados.map((person) => (
                      <tr key={person.id}>
                        <td>{person.principalName}</td>

                        <td>{person.name}</td>
                        <td>{person.asist === null && "sin confirmar"}</td>
                        <td>{person.etiqueta}</td>
                      </tr>
                    ))}
                </tbody>
              ) : (
                <tbody>
                  {noConfirmados &&
                    noConfirmados.map(
                      (person) =>
                        person.etiqueta === etiqueta && (
                          <tr key={person.id}>
                            <td>{person.principalName}</td>

                            <td>{person.name}</td>
                            <td>{person.asist === null && "sin confirmar"}</td>
                            <td>{person.etiqueta}</td>
                          </tr>
                        )
                    )}
                </tbody>
              )}
            </table>
          </>
        ) : (
          menu === "no asistira" && (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Familia</th>

                    <th>Invitado</th>
                    <th>Status</th>
                    <th>Etiqueta</th>
                  </tr>
                </thead>
                {etiqueta === "Todos" ? (
                  <tbody>
                    {noAsistiran &&
                      noAsistiran.map((person) => (
                        <tr key={person.id}>
                          <td>{person.principalName}</td>

                          <td>{person.name}</td>
                          <td>{person.asist === false && "no asistirá"}</td>
                          <td>{person.etiqueta}</td>
                        </tr>
                      ))}
                  </tbody>
                ) : (
                  <tbody>
                    {noAsistiran &&
                      noAsistiran.map(
                        (person) =>
                          person.etiqueta === etiqueta && (
                            <tr key={person.id}>
                              <td>{person.principalName}</td>

                              <td>{person.name}</td>
                              <td>{person.asist === false && "no asistirá"}</td>
                              <td>{person.etiqueta}</td>
                            </tr>
                          )
                      )}
                  </tbody>
                )}
              </table>
            </>
          )
        )}
      </div>
      {openModal && (
        <div className="modal-pases" tabindex="-1">
          <div className="modal-dialog modal-dialog-cerrar ">
            <div className="modal-content">
              <div className="modal-header"></div>
              <div className="modal-body text-center font-paris display-5 bg-white p-4 border-1">
                ¡Datos actualizados!
                <div className="modal-footer justify-content-center">
                  <button
                    onClick={() => {
                      setOpenModal(false);
                    }}
                    type="button"
                    className="btn-cerrar justify-content-center "
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
