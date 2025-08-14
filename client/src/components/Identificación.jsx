import { useState } from 'react';
import { Meta } from 'react-router-dom';

const Identificacion = () => {
  
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState('');
  const [responseApi, setResponseApi] = useState('');
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  async function fetchPlanta(Nombre_Planta) {

      let access_token
      try {
        const res = await fetch(
          `https://plant.id/api/v3/kb/plants/name_search?q=${Nombre_Planta}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Api-Key": import.meta.env.VITE_APP_API_KEY
            }
          }
        );
        
        
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }

        const data = await res.json();
        access_token = data.entities[0].access_token;
        console.log(data);
        //setPlanta(data);
      } catch (error) {
        console.error("Error obteniendo datos:", error);
      }
      let data = "";
      try {
        const res = await fetch(
          `https://plant.id/api/v3/kb/plants/${access_token}?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Api-Key": import.meta.env.VITE_APP_API_KEY
            }
          }
        );
        
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }

        data = await res.json();
        console.log(data);
        //setPlanta(data);
      } catch (error) {
        console.error("Error obteniendo datos:", error);
      }


    const requestDataPlanta = {
      Nombre: localStorage.getItem("Nombre_Planta"),
      Taxonomia: data.taxonomy.class,
    };
    console.log(requestDataPlanta);

    try {
      const res = await fetch('http://localhost:3200/guardar_planta', {
        method: 'POST',  // Especificamos el método POST
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(requestDataPlanta),  // Convertimos el objeto a JSON para enviarlo
      });

    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
    }

const handleUpload = async() => {
  if (!image) {
    setResponse('Por favor, seleccione una imagen antes de cargar.');
    return;
  }

  // Convertir imagen a Base64
  const reader = new FileReader();
  reader.onloadend = async() => {
    const base64String = reader.result; 
    //console.log('Base64:', base64String);

    console.log(import.meta.env)
    const res = await fetch(`${import.meta.env.VITE_APP_API_PLANT}/identification`, {
        method: 'POST',
        headers: {
          'Api-Key': import.meta.env.VITE_APP_API_KEY, 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          images: [base64String],
          latitude: 49.207,
          longitude: 16.608,
          similar_images: true
        })
      });

      const data = await res.json();

    let Sugerencias = data.result.classification.suggestions[0]
    console.log(Sugerencias.name);
    console.log(Sugerencias.probability);
    console.log(data.access_token);

    // directo al localstorage
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('Nombre_Planta',Sugerencias.name);
    
    fetchPlanta(Sugerencias.name);

    setUploading(true);
    setResponse('Cargando...');

    setResponseApi("Planta es: "+Sugerencias.name +"\n Probabilidad: "+ Sugerencias.probability)

    setTimeout(() => {
      setUploading(false);
      setResponse('Imagen cargada exitosamente.');
    }, 2000);
  };

  reader.readAsDataURL(image); // Esto genera el Base64
};


  return (
    <div>
      <h2>Identificación</h2>
      <p>Aqui puedes cargar las imagenes de las plantas.</p>

      <div className="upload-section" style={{ marginBottom: '20px' }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: '10px' }}
        />
        <br />
        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: uploading ? 'not-allowed' : 'pointer',
          }}
        >
          {uploading ? 'Cargando...' : 'Cargar Imagen'}
        </button>
      </div>

      <div className="mb-3">
        <label for="comment" class="form-label">Respuesta:</label>
        <textarea
          className="form-control"
          id="comment"
          rows="3"
          value={responseApi} // El valor del textarea se actualiza con el estado de 'response'
          readOnly
        />
      </div>

      <div className="response-console" style={{ marginTop: '20px', fontFamily: 'monospace', color: 'green' }}>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default Identificacion;
