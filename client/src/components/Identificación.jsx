import { useState } from 'react';

const Identificacion = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState('');

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
    console.log('Base64:', base64String);

    // Si necesitas mandarlo a un backend:
    // fetch('/api/upload', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ image: base64String })
    // });}

    const res = await fetch('https://plant.id/api/v3/identification', {
        method: 'POST',
        headers: {
          'Api-Key': 'AzPmUPH0GoWZqjbsNeqJlLtmMCActy61MAJrNcEB6Ijw5PxSml', // pon aquí tu API key real
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          images: [base64String],
          latitude: 49.207,
          longitude: 16.608,
          similar_images: true
        })
      });

    setUploading(true);
    setResponse('Cargando...');

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

      <div className="response-console" style={{ marginTop: '20px', fontFamily: 'monospace', color: 'green' }}>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default Identificacion;
