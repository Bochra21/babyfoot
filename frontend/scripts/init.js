import { createUser, getUserId } from '../services/userService.js';
import { getAllGames, addGame } from '../services/gameService.js';
import { displayGames, setupAddGame, allGames } from './games.js';
import { setupChat } from './chat.js';

let userName = '';
let userId = null;

async function init() {
  while (!userName) {
    userName = prompt("What's your name?");
    if (!userName) alert("Please enter your name!");
  }

  const userData = await createUser(userName);
  userId = await getUserId(userName);

  allGames.push(...await getAllGames());
  displayGames(allGames);

  setupAddGame(userId);
  setupChat(userName);
}

init();
