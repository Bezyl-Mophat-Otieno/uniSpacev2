import { useEffect } from 'react';
import WebSocket from 'ws';

const WebSocketClient = () => {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080'); // Connect to the WebSocket server

    // Event handlers
    ws.onopen = () => {
      alert('Connected to the WebSocket server.');
      const message = 'Hello, server!'
      console.log(" Sending message: " + message.toString());
      ws.send(message.toString());
    };

    ws.onmessage = (event) => {
      console.log('Server response:', event.data);
    };

    // ws.onclose = () => {
    //   alert('Disconnected from the WebSocket server.');
    // };

    // Clean up the WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  return null; // Render nothing, as this is a utility component
};

export default WebSocketClient;
