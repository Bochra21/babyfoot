const WebSocket = require('ws');
const { connectDB } = require('./db/client');

const wss = new WebSocket.Server({ port: 8080 });

(async () => {
  await connectDB();

  wss.on('connection', async ws => {
    console.log('Client connected');

    ws.on('message', msg => {
      let data;
      try {
        data = JSON.parse(msg);
      } catch {
        return;
      }

      if (data.type === 'chat') {
        broadcast({ type: 'chat', username: data.username, content: data.content });
      }
    });

    ws.on('close', () => console.log('Client disconnected'));
  });

  function broadcast(msg) {
    const str = JSON.stringify(msg);
    console.log('Broadcasting:', str);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) client.send(str);
    });
  }

  console.log('WebSocket server running on ws://localhost:8080');
})();
