export async function addGame(name, userId) {
  const response = await fetch('http://localhost:3000/babyfoot/games', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, userId })
  });

  if (!response.ok) throw new Error(`Failed to add game: ${response.status}`);
  return await response.json();
}

export async function deleteGame(gameId) {
  const response = await fetch(`http://localhost:3000/babyfoot/games/${gameId}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error(`Failed to delete game: ${response.status}`);
  return await response.json();
}

export async function getAllGames() {
  const response = await fetch('http://localhost:3000/babyfoot/games', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error(`Failed to fetch games: ${response.status}`);
  return await response.json();
}

