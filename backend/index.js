require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db/client');
const WebSocket = require('ws');

const userRoutes = require('./routes/users');
const gameRoutes = require('./routes/games');

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  await connectDB();

  app.use('/babyfoot/users', userRoutes);
  app.use('/babyfoot/games', gameRoutes);

  const PORT = process.env.PORT || 3000;
  const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  const wss = new WebSocket.Server({ server });

  wss.on('connection', ws => {
    console.log('Client connected via WebSocket');

    ws.on('message', message => {
      let data;
      try {
        data = JSON.parse(message);
      } catch {
        return;
      }

    });

    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });
  });

  function broadcast(msg) {
    const strMsg = JSON.stringify(msg);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) client.send(strMsg);
    });
  }
})();
