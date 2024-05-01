import React, { useState } from 'react';

function Chat({ payload }) {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  // Function to handle sending message to the server
  const sendMessage = async () => {
    try {
      // Update the payload with the new message
      const updatedPayload = { ...payload, message };

      // Send POST request to the server
      const response = await fetch('https://tama-ai.vercel.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPayload)
      });

      // Parse JSON response
      const data = await response.json();

      // Set the response from the server
      setResponse(data.reply);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chat" style={{ width: "100vw", margin: "4em", padding: "1em", backgroundColor: "rgba(20,40,224,0.4)", boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column" }}>

      <div><input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="You want to chat?"
      />
      <button onClick={sendMessage}>Chat Me</button></div>
        {response && <h2 style={{ margin: "1em",width:`${response.length*17}px` ,color: "rgba(35,35,30,0.9)", padding: "0.6em", borderRadius: "7%", backgroundColor: "white"}}>{response}</h2>}  
    </div>
  );
}

export default Chat;
