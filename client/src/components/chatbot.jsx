import { useState,useEffect } from 'react';

const chatbot = () => {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const [pregunta, Setpregunta] = useState('');
  const [responseApi, setResponseApi] = useState('');

  // Configuración
  const [Prompt, setPromt] = useState('Eres un experto en '+localStorage.getItem("Nombre_Planta"));
  const [Bot, SetBot] = useState('MyAppBot');
  
  const handleTextareaChange = (e) => {
    Setpregunta(e.target.value); 
  };

  const handleSendChange = async (e) => {
    askChatbot( pregunta, Prompt, 0.5, Bot);
    Guardar();
  };


  const Guardar = async () => {
    const requestData = {
      pregunta: pregunta,
      respuesta: responseApi,
    };
    console.log(requestData);

    try {
      const res = await fetch('http://localhost:3200/guardar_respuesta', {
        method: 'POST',  // Especificamos el método POST
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(requestData),  // Convertimos el objeto a JSON para enviarlo
      });

      

    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const askChatbot = async (question, prompt, temperature, appName) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_API_PLANT}/identification/${localStorage.getItem("access_token")}/conversation`, {
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
          rows="5"
          value={responseApi} // El valor del textarea se actualiza con el estado de 'response'
          readOnly
        />
      </div>

    </div>
  );
};

export default chatbot;