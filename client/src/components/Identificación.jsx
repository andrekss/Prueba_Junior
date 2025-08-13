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

    // Si necesitas mandarlo a un backend:
    // fetch('/api/upload', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ image: base64String })
    // });}

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
      <h2>Identcación</h2>
      <p>Aquí puede cargar sus documentos e imágenes.</p>

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
