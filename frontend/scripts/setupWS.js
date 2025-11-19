export function setupWS() {
  const gameList = document.getElementById('gameList');
  const gameCounter = document.getElementById('gameCounter');

  const ws = new WebSocket('ws://localhost:8080');

  ws.addEventListener('open', () => {
    console.log('Connected to WebSocket for games');
  });

  ws.addEventListener('message', async (event) => {
    let data = event.data;
    if (data instanceof Blob) data = await data.text();

    try {
      const msg = JSON.parse(data);

      if (msg.type === 'updateGames') {
        msg.games.forEach(g => {
          const index = allGames.findIndex(game => game.id === g.id);
          if (index > -1) allGames[index] = g;
          else allGames.push(g);
        });
        displayGames(allGames);
      }

      if (msg.type === 'deleteGame') {
        const index = allGames.findIndex(game => game.id === msg.gameId);
        if (index > -1) allGames.splice(index, 1);
        displayGames(allGames);
      }

    } catch (err) {
      console.warn('Non-JSON message from WS:', data);
    }
  });

  return ws; 
}
