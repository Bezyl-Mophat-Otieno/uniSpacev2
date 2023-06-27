import { Server } from 'ws';
import { dbConnect } from '@/utils/mongodb';
import StudentOrganization from '@/models/StudentOrganization';
export  default async function handler  (req,res){

   if (!res.socket.server.websocketServer) {
      // Create a new WebSocket server instance
      const wss = new Server({ noServer: true });
  
      // Set the WebSocket server instance on the server socket
      res.socket.server.websocketServer = wss;
  
      // Handle WebSocket connection
      wss.on('connection', (ws) => {
        console.log('New client connected');
  
        // Handle WebSocket messages
        ws.on('message', async (message) => {
          console.log('Received message:', message);
  
  
          try {
 
          console.log(message)

    // Send a success message back to the client
    ws.send(JSON.stringify({ status: 'success', message: 'Executives Added Successfully' }));         
   
   
   } catch (error) {
    // Send an error message back to the client
    ws.send(JSON.stringify({ status: 'error', message: 'Error  Adding the executives' }));}
        });
  
        // Handle WebSocket disconnection
      //   ws.on('close', () => {
      //     console.log('Client disconnected');
      //   });
      });
    }
  
    // Upgrade the HTTP request to a WebSocket connection
    res.socket.server.websocketServer.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
      res.socket.server.websocketServer.emit('connection', ws);
    });
  }



