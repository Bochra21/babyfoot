require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db/client');

const userRoutes = require('./routes/users');
 const gameRoutes = require('./routes/games');
// const messageRoutes = require('./routes/messages');

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  await connectDB();

  // Routes
  app.use('/babyfoot/users', userRoutes);
  app.use('/babyfoot/games', gameRoutes);
  // app.use('/babyfoot/messages', messageRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
