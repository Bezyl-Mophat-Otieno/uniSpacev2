import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log('Received message:', message);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

export default function socketHandler(req, res) {
  if (req.method === 'GET') {
    const { socket } = req;

    // Upgrade the HTTP request to a WebSocket connection
    wss.handleUpgrade(req, socket, Buffer.alloc(0), (ws) => {
      wss.emit('connection', ws);
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
