const { client } = require('../db/client');

// Create a new game
async function createGame(req, res) {
  const { name, userId } = req.body;

  try {
    const result = await client.query(
      'INSERT INTO "Game" (name, userid) VALUES ($1, $2) RETURNING *',
      [name, userId]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);

    if (err.code === '23505') {
      return res.status(400).json({ error: 'Game name must be unique' });
    }

    return res.status(500).json({ error: 'Database error' });
  }
}

// Finish a game
async function finishGame(req, res) {
  const { gameId } = req.params;

  try {
    const result = await client.query(
      'UPDATE "Game" SET state = $1 WHERE id = $2 RETURNING *',
      ['finished', gameId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Game not found' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
}

// Delete a game
async function deleteGame(req, res) {
  const { gameId } = req.params;

  try {
    const result = await client.query(
      'DELETE FROM "Game" WHERE id = $1 RETURNING *',
      [gameId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Game not found' });
    }

    return res.json({ message: 'Game deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
}

// Get all games
async function getAllGames(req, res) {
  try {
    const result = await client.query('SELECT * FROM "Game"');
    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
}

// get game id by game name
async function getGameId(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Game name is required' });
  }

  try {
    const result = await client.query(
      'SELECT id FROM "Game" WHERE name = $1',
      [name]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Game not found' });
    }

    return res.json({ id: result.rows[0].id });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
}

module.exports = {
  createGame,
  finishGame,
  deleteGame,
  getAllGames,
  getGameId
};
