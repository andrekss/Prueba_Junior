import { useState } from 'react';

const Historial = () => {
  
  const [pregunta, Setpregunta] = useState('');
  const [responseApi, setResponseApi] = useState('');

  // Configuración
  const [Prompt, setPromt] = useState('Eres un experto en plantas');
  const [Bot, SetBopt] = useState('Eres un experto en plantas');


  const handleTextareaChange = (e) => {
    Setpregunta(e.target.value); 
  };

  const handleSendChange = async(e) => {
    await askChatbot( pregunta, Prompt, 0.5, Bot);

  };

    const Obtener_Lista = async () => {
    try {
      const res = await fetch('http://localhost:3200/Get');
      const data = await res.json();
      setHistorial(data); // Suponiendo que el endpoint devuelve un array de objetos con pregunta, respuesta y fecha
    } catch (error) {
      console.error('Error al obtener el historial:', error);
    }
  };

 const askChatbot = async (question, prompt, temperature, appName) => {
    try {
        console.log(localStorage.getItem("access_token"))
      const res = await fetch(`${import.meta.env.VITE_APP_API_PLANT}/${localStorage.getItem("access_token")}/conversation`, {
        method: 'POST',
        headers: {
          'Api-Key': import.meta.env.VITE_APP_API_KEY, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question,
          prompt: prompt,
          temperature: temperature,
          app_name: appName,
        }),
      });

      const chatData = await res.json();
      console.log('Chatbot Response:', chatData);

      // Extraer y mostrar la respuesta del chatbot
      setResponseApi(chatData.messages[chatData.messages.length - 1].content);

    } catch (error) {
      console.error('Error al interactuar con el chatbot:', error);
      setResponseApi('Hubo un problema con el chatbot');
    }
  };


  return (
    <div>
      <h2>Chatbot</h2>
      <p>Preguntale lo que quieras al agente de IA sobre la planta {localStorage.getItem("Nombre_Planta")}</p>
      <h6></h6>

      <div className="mb-3">
        <label for="comment" class="form-label">Preguntar:</label>
        <textarea
          className="form-control"
          id="comment"
          rows="3"
          onChange={handleTextareaChange}
        />
      </div>
        <button
          onClick={handleSendChange}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
          }}
        >Enviar Mensaje</button>
      <div className="mb-3">
        <label for="comment" class="form-label">Respuesta:</label>
        <textarea
          className="form-control"
          id="comment"
          rows="10"
          value={responseApi} // El valor del textarea se actualiza con el estado de 'response'
          readOnly
        />
      </div>

    </div>
  );
};

export default Historial;
