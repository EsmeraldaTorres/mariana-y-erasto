// GuestTable.jsx
import React from "react";

const GuestTable = ({ guests, showTableSelect, mesas, onTableChange }) => {
  return (
    <table className="table table-bordered table-striped table-hover mt-3">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Status</th>
          <th>Etiqueta</th>
          {showTableSelect && <th>Mesa</th>}
        </tr>
      </thead>
      <tbody>
        {guests.map((guest, index) => (
          <tr key={`${guest.name}-${index}`}>
            <td>{guest.name}</td>
            <td>
              {guest.asist === true
                ? "Confirmado"
                : guest.asist === false
                ? "No asistirá"
                : "Sin confirmar"}
            </td>
            <td>{guest.etiqueta}</td>
            {showTableSelect && (
              <td>
                <select
                  className="form-select"
                  value={guest.table || ""}
                  onChange={(e) => onTableChange(index, e.target.value)}
                >
                  <option value="">Seleccionar mesa</option>
                  {mesas.map((mesa) => (
                    <option key={mesa} value={mesa}>
                      {mesa}
                    </option>
                  ))}
                </select>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GuestTable;
