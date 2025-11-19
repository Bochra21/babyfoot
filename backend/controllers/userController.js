const { client } = require('../db/client');

async function createUser(req, res) {
  const { username } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO "User" (username) VALUES ($1) RETURNING *',
      [username]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}

async function getUserId(req, res) {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const result = await client.query(
      'SELECT id FROM "User" WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ id: result.rows[0].id });
  } catch (err) {
    console.error("Error fetching user ID:", err);
    res.status(500).json({ error: "Database error" });
  }
}

module.exports = { createUser, getUserId };
