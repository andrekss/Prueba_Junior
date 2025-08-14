import React, { useState, useEffect } from "react";

export default function Busqueda() {
  const [datos, setDatos] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");  // Estado para filtrar por nombre
  const [filtroTaxonomia, setFiltroTaxonomia] = useState("");  // Estado para filtrar por taxonomía

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_SERVER}/Mostrar_Planta`);
        const data = await res.json();

        setDatos(data);

      } catch (err) {
        console.error("Error obteniendo historial:", err);
      }
    }, 2000);

    return () => clearInterval(interval); // Limpiar cuando el componente se desmonta
  }, []);

  // Filtrar los datos con base en los valores de los filtros
  const datosFiltrados = datos.filter((planta) => {
    return (
      (planta.nombre.toLowerCase().includes(filtroNombre.toLowerCase())) &&  // Filtrar por nombre
      (planta.taxonomia.toLowerCase().includes(filtroTaxonomia.toLowerCase())) // Filtrar por taxonomía
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Busqueda de Plantas</h2>

      {/* Filtros */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Filtrar por Nombre"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            width: "200px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
        <input
          type="text"
          placeholder="Filtrar por Taxonomía"
          value={filtroTaxonomia}
          onChange={(e) => setFiltroTaxonomia(e.target.value)}
          style={{
            padding: "8px",
            width: "200px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
      </div>

      {/* Tabla */}
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          border: "1px solid black",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Nombre</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Taxonomía</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map((fila) => (
            <tr key={fila.id}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {fila.nombre}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {fila.taxonomia}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
