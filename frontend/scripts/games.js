import { addGame, getAllGames, deleteGame } from '../services/gameService.js';

const gameInput = document.getElementById('gameInput');
const addGameBtn = document.getElementById('addGameBtn');
const gameList = document.getElementById('gameList');
const gameCounter = document.getElementById('gameCounter');

export let allGames = [];

/**
 * Display all games in the list
 * @param {Array} games - array of game objects
 */
export function displayGames(games) {
  gameList.innerHTML = '';
  games.forEach(game => gameList.appendChild(createGameItem(game)));
  updateCounter();
}

function updateCounter() {
  const unfinished = gameList.querySelectorAll('li:not(.finished)').length;
  gameCounter.textContent = `Unfinished games: ${unfinished}`;
}

/**
 * Create a single game item element
 * @param {Object} game - game object
 */
function createGameItem(game) {
  const li = document.createElement('li');
  li.className = 'flex items-center justify-between bg-gray-700 p-2 rounded shadow hover:bg-gray-600 transition';
  li.dataset.gameid = game.id;
  li.dataset.userid = game.userId;

  const span = document.createElement('span');
  span.textContent = game.name;
  span.className = 'font-medium';
  li.appendChild(span);

  const btnContainer = document.createElement('div');
  btnContainer.className = 'flex gap-2';

  const finishBtn = document.createElement('button');
  finishBtn.textContent = 'Finish';
  finishBtn.className = 'bg-tealCustom text-white px-2 py-1 rounded hover:bg-green-500 transition text-sm';
  finishBtn.onclick = async () => {
    span.classList.add('line-through', 'text-gray-400');
    li.classList.add('bg-tealCustom', 'finished');
    finishBtn.disabled = true;
    finishBtn.classList.add('opacity-50', 'cursor-not-allowed');
    updateCounter();

  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'bg-red-400 text-white px-2 py-1 rounded hover:bg-red-500 transition text-sm';
  deleteBtn.onclick = async () => {
    try {
      await deleteGame(game.id);
      li.remove();
      allGames = allGames.filter(g => g.id !== game.id);
      updateCounter();

    } catch (err) {
      console.error('Failed to delete game:', err);
    }
  };

  btnContainer.appendChild(finishBtn);
  btnContainer.appendChild(deleteBtn);
  li.appendChild(btnContainer);

  return li;
}

/**
 * Setup adding a new game
 * @param {string} userId - current user ID
 */
export function setupAddGame(userId) {
  addGameBtn.addEventListener('click', async () => {
    const name = gameInput.value.trim();
    if (!name || !userId) return;

    try {
      const gameData = await addGame(name, userId);
      allGames.push(gameData);

      gameList.appendChild(createGameItem(gameData));
      updateCounter();

    } catch (err) {
      console.error('Failed to add game:', err);
    }

    gameInput.value = '';
    gameInput.focus();
  });

  gameInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addGameBtn.click();
  });
}


let pollingInterval = null;

/**
 * Start polling the backend for games every N milliseconds
 * @param {number} interval - polling interval in ms (default 2000)
 */
export function startGamePolling(interval = 2000) {
  fetchAndDisplayGames();
  pollingInterval = setInterval(fetchAndDisplayGames, interval);
}

export function stopGamePolling() {
  if (pollingInterval) clearInterval(pollingInterval);
}

async function fetchAndDisplayGames() {
  try {
    const games = await getAllGames();
    allGames = games;
    displayGames(games); 
  } catch (err) {
    console.error('Polling failed to fetch games:', err);
  }
}
