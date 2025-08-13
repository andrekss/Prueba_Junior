import React, { useState, useEffect } from "react";

export default function TablaDinamica() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_SERVER}/historial`); 
        const data = await res.json();
  
        // Si quieres que la tabla crezca solo con lo nuevo:
        setDatos(data);
  
      } catch (err) {
        console.error("Error obteniendo historial:", err);
      }
    }, 2000); 
  
    return () => clearInterval(interval); // limpiar cuando el componente se desmonta
  }, [datos]);

  return (
<div style={{ padding: "20px" }}>
  <h2>Historial de Chats</h2>
  <table
    style={{
      borderCollapse: "collapse",
      width: "100%",
      border: "1px solid black"
    }}
  >
    <thead>
      <tr>
        <th style={{ border: "1px solid black", padding: "8px" }}>Pregunta</th>
        <th style={{ border: "1px solid black", padding: "8px" }}>Respuesta</th>
        <th style={{ border: "1px solid black", padding: "8px" }}>Fecha</th>
      </tr>
    </thead>
    <tbody>
      {datos.map((fila) => (
        <tr key={fila.id}>
          <td style={{ border: "1px solid black", padding: "8px" }}>
            {fila.pregunta}
          </td>
          <td style={{ border: "1px solid black", padding: "8px" }}>
            {fila.respuesta}
          </td>
          <td style={{ border: "1px solid black", padding: "8px" }}>
            {fila.fecha}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}
