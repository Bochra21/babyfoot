const express = require('express');
const router = express.Router();

const {
  createGame,
  finishGame,
  deleteGame,
  getAllGames,
  getGameId
} = require('../controllers/gameController');

// Add a new game
router.post('/', createGame);

// Finish a game
router.patch('/:gameId', finishGame);

// Delete a game
router.delete('/:gameId', deleteGame);

// Get all games
router.get('/', getAllGames);

// Get game id by game name
router.post('/get-id', getGameId);


module.exports = router;
